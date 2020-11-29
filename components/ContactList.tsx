import React from 'react'
import { View, Text, Image,TouchableWithoutFeedback } from 'react-native'
import {User} from '../types'
import styles from './Styles'
import {useNavigation} from '@react-navigation/native'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createChatRoom, createChatRoomUser } from '../graphql/mutations'
import { listChatRooms } from '../graphql/queries'


export type ContactListprops={
    user:User;
}

const ContactList = (props:ContactListprops) => {

   
    const navigation = useNavigation();
    const {user}= props

    const clickHandler = async() => {

        try{


            const listChatRoom = await API.graphql(
                graphqlOperation(
                  listChatRooms
                )
            )

            const checkChatRoom=listChatRoom.data.listChatRooms.items.filter(chats => chats.name === `${user.name} Chatroom`)

            if (checkChatRoom.length === 0) {

                const chatRoomData = await API.graphql(
                    graphqlOperation(
                        createChatRoom,
                       {
                        input:{
                            name:`${user.name} Chatroom`,
                            lastMessageID:"lk753fca-e8c3-473b-8e85-b14196e84e47",
                            }
                       }
                           
                    )
                )
    
                if (!chatRoomData.data) {
                    console.log("Failed to create a chatRoom")
                    return;
                }
    
                const newChatRoom = chatRoomData.data.createChatRoom
    
                const chatRoomUser = await API.graphql(
                    graphqlOperation(
                        createChatRoomUser,
                        { input:{
    
                            userID:user.id,
                            chatRoomID: newChatRoom.id
                        }
                        }
                    )
                )
    
                const userInfo = await Auth.currentAuthenticatedUser();
                await API.graphql(
                    graphqlOperation(
                        createChatRoomUser,
                        { input: {
    
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id
                        }
                        }
                    )
                )
    
                navigation.navigate("ChatRoom",{id:newChatRoom.id, name:user.name})

            } else {
                navigation.navigate("ChatRoom",{
                    id:checkChatRoom[0].id,
                    name:user.name
                })
            }

        } catch (e) {
            console.log(e)
        }
           
        
    }

    return (
        <TouchableWithoutFeedback onPress={clickHandler}>
            <View style={styles.chats_container}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri:user.imageUri}} style={styles.user_avatar} />
                    <View style={styles.chats_info}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>{user.name}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{color:'gray',fontSize:16}}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactList
