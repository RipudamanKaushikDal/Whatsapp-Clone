import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import styles from './Styles'

const ContactsButton = () => {

    const navigation = useNavigation();

    const clickHandler = () => {
        navigation.navigate('ContactList')
    }

    return (
        <View style={styles.contacts_icon}>
        <TouchableOpacity onPress={clickHandler}>
            <MaterialCommunityIcons name="message-reply-text" size={28} color={'white'} />
        </TouchableOpacity>
      </View>
    )
}

export default ContactsButton
