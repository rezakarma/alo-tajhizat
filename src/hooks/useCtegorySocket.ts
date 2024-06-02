import { useState, useEffect } from "react";
// import GetToken from "@/app/auth/getToken";
// import * as signalR from "@microsoft/signalr";
import { io } from "socket.io-client";


const useCategorySocket = (onBrandAdd) => {
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const createConnection = async () => {
    //   const token = await GetToken();
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}/realtimeCategories`);

    socket.on('connect', () => {
      console.log('Connected to category realtime');
    });

    socket.on('addCategory', (data) => {
        console.log('addCategory', data);
        onBrandAdd(data,"ADD_CATEGORY")
      });

      socket.on('deleteCategory', (data) => {
        console.log('deleteCategory', data);
        onBrandAdd(data,"DELETE_CATEGORY")
      });

      socket.on('updateCategory', (data) => {
        console.log('updateCategory', data);
        onBrandAdd(data,"UPDATE_CATEGORY")
      });
      
      
    };

    createConnection();
  }, []);

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

export default useCategorySocket;