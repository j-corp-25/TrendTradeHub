import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const SocketContext = createContext();



export const useSocket = () => {
    return useContext(SocketContext)
}
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      query: {
        userId: user?._id,
      },
    });
    setSocket(socket);

    return () => socket && socket.close();
  }, [user?._id]);

  return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>;
};

export default SocketContext;
