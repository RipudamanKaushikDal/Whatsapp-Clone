export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ChatRoom:undefined;
  ContactList:undefined;
};

export type MainTabParamList = {
  Chats: undefined;
  Status: undefined;
  Calls:undefined;
};

export type TabOneParamList = {
  ChatScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id:String;
  imageUri:string;
  name:string;
  status:string;
};


export type Message={
  id:String;
  content:string;
  createdAt:string;
  user:User;
}

export type Chatroom = {
  id:String;
  users:User[];
  lastMessage:Message;
}