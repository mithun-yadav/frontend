import { create } from "zustand";
import {
  ConversationStore,
  messagesInterface,
  UserType,
} from "../assets/types/commonInterfaces";

const useConversation = create<ConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: UserType) =>
    set({ selectedConversation }),
  messages: null,
  setMessages: (messages: messagesInterface) => set({ messages }),
}));

export default useConversation;
