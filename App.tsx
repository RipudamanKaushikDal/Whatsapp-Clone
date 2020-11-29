import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify,{Auth,API,graphqlOperation} from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';

Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  useEffect(() => {
    
    const fetchUser = async() => {

      // get authencticated from Auth
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});

      console.log(userInfo)

      if (userInfo) {

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {id:userInfo.attributes.sub}
          )
        )

        console.log(userData)

        if (userData.data.getUser){
          console.log("User is already registered")
          return
        }

        const newUser = {
          id:userInfo.attributes.sub,
          name:userInfo.username,
          imageUri:"https://images2.fanpop.com/image/polls/457000/457119_1275508934654_full.jpg?v=1275508943",
          status:"Hey! I am Using WhatsApp"
        }

        console.log(newUser)

        await API.graphql(
          graphqlOperation(
            createUser,{input:newUser}
          ))

      }

  
    }
    
    fetchUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)