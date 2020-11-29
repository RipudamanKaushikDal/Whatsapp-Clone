import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName,View,Image } from 'react-native';
import styles from '../components/Styles';
import Colors from '../constants/Colors';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import Contacts from '../components/Contacts';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle:{
        backgroundColor:Colors.light.tint,
        shadowOpacity:0,
        elevation:0,
    },
      headerTintColor:Colors.light.background,
      headerTitleAlign:'left',
      headerTitleStyle:{
        fontWeight:'bold',
      }

    }}>
      <Stack.Screen name="Root" 
      component={MainTabNavigator}
      options={{
        title:"WhatsApp",
        headerRight:() => (
          <View style={styles.header_right}>
              <Octicons name="search" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
          </View>
        )
      }}
       />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} 
      options={({route}) => ({
        title: route.params.name,
        headerRight:() => (
          <View style={styles.chatscreen_rightHeader}>
            <FontAwesome5 name="video" size={22} color={'white'} />
            <MaterialIcons name="call" size={22} color={'white'} />
            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
          </View>
        ),

      })} />
      <Stack.Screen name="ContactList" component={Contacts} options={{ title: 'Select Contact' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
