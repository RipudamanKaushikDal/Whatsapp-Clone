import { API, graphqlOperation } from 'aws-amplify';
import React,{useState,useEffect} from 'react';
import { StyleSheet,FlatList} from 'react-native';
import { View } from '../components/Themed';
import { listUsers } from '../graphql/queries';
import ContactList from './ContactList';



export default function TabOneScreen() {

  const [Users,setUsers] = useState([]);

  useEffect(() => {
    
    const fetchUsers = async() => {
      try {
        const userData = await API.graphql(
          graphqlOperation(listUsers)
        )

        setUsers(userData.data.listUsers.items)
      } catch (e) {
        console.log(e)
      }
    }
    fetchUsers();
    }
  , []);

  return (
    <View style={styles.container}>
      <FlatList
      style={{width:'100%'}}
      data={Users}
      renderItem={({item}) => <ContactList user={item} />}
      keyExtractor={(item) => item.id}
      /> 
      
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