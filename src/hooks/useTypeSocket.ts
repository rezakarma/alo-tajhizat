import { useState, useEffect } from "react";
// import GetToken from "@/app/auth/getToken";
// import * as signalR from "@microsoft/signalr";
import { io } from "socket.io-client";


const useTypeSocket = (onBrandAdd) => {
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const createConnection = async () => {
    //   const token = await GetToken();
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}/realtimeTypes`);

    socket.on('connect', () => {
      console.log('Connected to type realtime');
    });

    socket.on('addType', (data) => {
        console.log('addType', data);
        onBrandAdd(data,"ADD_TYPE")
      });

      socket.on('deleteType', (data) => {
        console.log('deleteType', data);
        onBrandAdd(data,"DELETE_TYPE")
      });

      socket.on('updateType', (data) => {
        console.log('updateType', data);
        onBrandAdd(data,"UPDATE_TYPE")
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

export default useTypeSocket;