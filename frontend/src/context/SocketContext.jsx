import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return;

  <SocketContext.Provider value={"hi"}>{children}</SocketContext.Provider>;
};

export default SocketContext;
