import { Socket } from "socket.io-client";
import {create} from "zustand";
import { io } from "socket.io-client";

interface SocketProps {
    socket: Socket | null;
    initializeSocket: ()=>void;
    disconnectSocket: ()=>void;
}

export const useSocket = create<SocketProps>((set)=>({
    initializeSocket:()=>{
        const newSocket = io("http://localhost:3001");
        set({socket:newSocket});
    },
    disconnectSocket:disconnectSocketInstance,
    socket:null
}));

function disconnectSocketInstance(){
    const socket = useSocket(state=>state.socket);

    return socket?.disconnect();
}