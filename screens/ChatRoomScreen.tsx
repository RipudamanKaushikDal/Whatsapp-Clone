import React, { useEffect,useState } from 'react'
import { ImageBackground,FlatList} from 'react-native'
import { useRoute} from '@react-navigation/native'
import ChatMessages from '../components/ChatMessages';
import InputBox from '../components/InputBox';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

const ChatRoomScreen = () => {

    const route = useRoute();
    const [messages, setmessages] = useState([])
    const [userID, setuserID] = useState('')

    const fetchMessages = async ( ) => {
        const messagesData = await API.graphql(
            graphqlOperation(
                messagesByChatRoom,
                {
                    chatRoomID:route.params.id,
                    sortDirection:'DESC',
                }
            )
        )
        setmessages(messagesData.data.messagesByChatRoom.items)
    }

    useEffect(() => {
        
        fetchMessages()
    },[])

    useEffect(() => {
        const userInfo = async () => {
           const getID = await Auth.currentAuthenticatedUser()

            setuserID(getID.attributes.sub)

        }

        userInfo()

    },[])


    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next:(data) => {
                const newMessage = data.value.data.onCreateMessage;
                if (newMessage.chatRoomID !== route.params.id) {
                    console.log("Message in another chatroom")
                    return;
                }

                setmessages(prevState => {
                    return [newMessage,...prevState]
                })
            }
        })

        return () => subscription.unsubscribe()
    },[])

    return (
        <ImageBackground style={{width:'100%', height:'100%'}} source={require("../assets/images/BG.png")}>
            <FlatList 
            data={messages}
            renderItem = {({item}) => <ChatMessages message={item} id={userID} />}
            keyExtractor={(item) => item.id}
            inverted
            />
            <InputBox chatRoomID={route.params.id} />
        </ImageBackground>
    )
}

export default ChatRoomScreen
