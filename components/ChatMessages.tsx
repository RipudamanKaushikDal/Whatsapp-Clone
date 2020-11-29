import moment from 'moment'
import React from 'react'
import { View, Text } from 'react-native'
import Colors  from '../constants/Colors'
import {Message} from '../types'
import styles from './Styles'

export type MessageProps = {
    message:Message,
    id:string
}


const ChatMessages = (props:MessageProps) => {

    const {message,id} = props;

    const isMyMessage = () => {return message.user.id === id}

    return (
        <View style={styles.message_container}>
            <View style={ [styles.messageBox,  isMyMessage() && styles.userMessage]}> 
               {!isMyMessage() && <Text style={{color:Colors.light.tint,marginBottom:5,marginLeft:5}}>{message.user.name}</Text>}
                <Text style={{marginBottom:2,marginLeft:5}}>{message.content}</Text>
                <Text style={{alignSelf:'flex-end',color:'grey',paddingRight:5}}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}

export default ChatMessages
