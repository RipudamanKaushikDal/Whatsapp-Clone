import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, { useState,useEffect } from 'react'
import { View,TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createMessage, updateChatRoom } from '../graphql/mutations'
import styles from './Styles'

const InputBox = ({chatRoomID}) => {

    const [message,setMessage] = useState('');
    const [userId,setUserId] = useState(null);


    useEffect(() => {

        const fetchUser = async() => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setUserId(userInfo.attributes.sub)
        }

        fetchUser();
    },[])

    const handleClick = () => {
        if (!message) {

            recordMessage();
        } else{
            sendMessage();

        }
    }

    const recordMessage = () => {
        console.log('recording..')
    }

    const updatelastMessage = async(messageId:string) => {

        try {
            
            await API.graphql(
                graphqlOperation(
                    updateChatRoom,
                    {
                        input:{
                            id:chatRoomID,
                            lastMessageID:messageId,
                        }
                    }
                )
            )
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async()  => {
        try {

            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage,
                    {
                        input:{
                            content:message,
                            userID: userId,
                            chatRoomID
                        }
                    }
                )
            )
           
            await updatelastMessage(newMessageData.data.createMessage.id)
        } catch (error) {
            console.log(error)
        }
        setMessage('')
    }

    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
                <FontAwesome5 name="laugh-beam" size={24} color={'grey'} />
                <TextInput  multiline 
                style={styles.textInput}
                placeholder="Type a message"
                value={message}
                onChangeText={setMessage}
                />
                <Entypo name="attachment" size={24} color={'grey'} style={styles.inputIcons} />
                {!message && <Fontisto name="camera" size={24} color={'grey'} style={styles.inputIcons} />}
            </View>

            <TouchableOpacity onPress={handleClick}>
                <View style={styles.micIcon}>

                    { message === '' ? <MaterialCommunityIcons name="microphone" size={28} color={'white'}/> :
                    <MaterialCommunityIcons name="send" size={28} color={'white'} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox
