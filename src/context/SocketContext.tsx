import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useAuth } from "./AuthProvider";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onLineUsers: string[];
}

const SocketContext = createContext<SocketContextType | null>(null);
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocketContext must be used within SocketProvider");
  return context;
};

function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onLineUsers, setOnLineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5002", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        if (JSON.stringify(users) !== JSON.stringify(onLineUsers)) {
          setOnLineUsers(users);
          console.log("Socket Disconnected!");
        }
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onLineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
