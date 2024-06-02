import { useState, useEffect } from "react";
// import GetToken from "@/app/auth/getToken";
// import * as signalR from "@microsoft/signalr";
import { io } from "socket.io-client";
const url = process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT;
console.log('url ', url)

const useSocketIo = (onBrandAdd) => {
  const [connection, setConnection] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const createConnection = async () => {
    //   const token = await GetToken();
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}/realtimeBrands`);

    socket.on('connect', () => {
      console.log('Connected to service 1');
    });

    socket.on('addBrand', (data) => {
        console.log('addBrand', data);
        onBrandAdd(data,"ADD_BRAND")
      });

      socket.on('deleteBrand', (data) => {
        console.log('deleteBrand', data);
        onBrandAdd(data,"DELETE_BRAND")
      });

      socket.on('updateBrand', (data) => {
        console.log('deleteBrand', data);
        onBrandAdd(data,"UPDATE_BRAND")
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

export default useSocketIo;