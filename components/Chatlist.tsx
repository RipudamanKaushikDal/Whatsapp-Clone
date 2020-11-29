import React from 'react'
import { View, Text, Image,TouchableWithoutFeedback } from 'react-native'
import {Chatroom} from '../types'
import styles from './Styles'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'


export type Chatlistprops={
    chatRoom:Chatroom;
    authUser:String;
}

const Chatlist = (props:Chatlistprops) => {

    const {chatRoom,authUser} = props;
    const navigation = useNavigation();
    const users= chatRoom.chatRoomUsers.items.filter(User => User.user.name !== authUser)
    const user=users[0].user

    const clickHandler = () => {
        navigation.navigate('ChatRoom',{id:chatRoom.id, name:user.name, image:user.imageUri})
    }

    return (
        <TouchableWithoutFeedback onPress={clickHandler}>
            <View style={styles.chats_container}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri:user.imageUri}} style={styles.user_avatar} />
                    <View style={styles.chats_info}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>{user.name}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{color:'gray',fontSize:16}}>
                            {chatRoom.lastMessage?chatRoom.lastMessage.content:""}
                            </Text>
                    </View>
                </View>
            <Text style={{color:'gray',fontSize:16}}>
                {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
            </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Chatlist
