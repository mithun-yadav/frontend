export interface UserType {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface userMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface messagesInterface {
  messages: userMessage[];
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ConversationStore {
  selectedConversation: UserType | null;
  setSelectedConversation: (selectedConversation: UserType) => void;
  messages: messagesInterface[] | null; // Reflects the nested structure
  setMessages: (messages: messagesInterface) => void; // Matches the API response
}
