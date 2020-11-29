import { API, Auth, graphqlOperation } from 'aws-amplify';
import  React,{useEffect,useState} from 'react';
import { StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import Chatlist from '../components/Chatlist';
import ContactsButton from '../components/ContactsButton';
import { View } from '../components/Themed';
import {getUser} from '../components/query'




export default function TabOneScreen() {

  const [chatRooms , setChatRoom] = useState([])
  const [authUserName,setAuthUserName] = useState("");


  useEffect(() => {

    const chatroomusers = async () => {

      try{

        const userInfo = await Auth.currentAuthenticatedUser();
        setAuthUserName(userInfo.username)
  
        const users = await API.graphql(
          graphqlOperation(
            getUser,
            {
              id: userInfo.attributes.sub
            }
          )
        )
        const arr = users.data.getUser.chatRoomUser.items
        const chatrooms = arr.filter(room => room.chatRoom !== null )
        setChatRoom(chatrooms)
      } catch (e) {
        console.log(e)
      }

      
    }
    
    chatroomusers();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
      style={{width:'100%'}}
      data={chatRooms}
      renderItem={({item}) => <Chatlist chatRoom={item.chatRoom} authUser={authUserName} />}
      keyExtractor={(item) => item.id}
      /> 
      <ContactsButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
