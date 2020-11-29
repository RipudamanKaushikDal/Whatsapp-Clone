import {StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({

    header_right:{

        flexDirection:'row',
        width:60,
        justifyContent:'space-between',
        marginRight:10,
        backgroundColor:'transparent',
    },

    chats_container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
    },

    user_avatar:{
        width:60,
        height:60,
        borderRadius:50,
        marginRight:15,
    },

    chats_info:{
        justifyContent:'space-around',
        alignItems:"flex-start",
    },

    chatscreen_rightHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:100,
        marginRight:10,
        backgroundColor:'transparent',
    },

    message_container:{

        padding:10,
    },

    messageBox:{
        backgroundColor:'whitesmoke',
        marginRight:50,
        borderRadius:8,
        padding:5,

    },

    userMessage:{
        backgroundColor:'#DCF8C5',
        marginLeft:50,
        marginRight:0,
    },

    inputContainer:{
        flexDirection:'row',
        alignItems:'flex-end',
    },

    inputBox:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        margin:10,
        borderRadius:25,
        marginRight:10,
        alignItems:'flex-end',
    },

    micIcon:{

        backgroundColor:Colors.light.tint,
        justifyContent:'center',
        alignItems:'center',
        width:50,
        height:50,
        borderRadius:50,
        marginBottom:10
    },

    textInput:{

        flex:1,
        marginHorizontal:10,
    },

    inputIcons:{

        marginHorizontal:5,
    },

    contacts_icon:{
        width:60,
        height:60,
        backgroundColor:Colors.light.tint,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:20,
        bottom:20,
    },

    chatroom_image:{
        borderRadius:25,
        width:40,
        height:40,
        margin:5,
        resizeMode:'contain',
    }
    

})


export default styles