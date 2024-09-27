import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import useCurrentUser from "./useCurrentUser";
import { useSession } from "next-auth/react";
const url = process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT;

const useProductStatusSocket = (onStatusChange,selectedStatus) => {
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [userId, setUserId] = useState<null | string | undefined>();
  const user = useCurrentUser();
  const session = useSession();

  useEffect(() => {
    if (user && user.id && !userId) {
      setUserId(user.id);
    }
    return
  }, [user]);

  useEffect(() => {
    const createConnection = async () => {
      //   const token = await GetToken();
      if(!userId){
        return
      }
      const socket = io(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}/realtimeOrders`,
        {
          auth: {
            userId: userId,
          },
        }
      );

      socket.on("connect", () => {
        console.log("Connected to service 1");
      });

      socket.on("updateOrders", (data) => {
        onStatusChange(data,selectedStatus);
        console.log(onStatusChange, " fnth");
        console.log("updateOrders 2 ", data);
      });
    };

    createConnection();
  }, [userId,selectedStatus]);

  useEffect(() => {
    if (connection && connectionStatus === "connected") {
      return () => {
        connection.stop();
        setConnection(null);
        setConnectionStatus("disconnected");
      };
    }
  }, [connection, connectionStatus]);

  return connection;
};

export default useProductStatusSocket;
