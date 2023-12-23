import {create} from "zustand"
import {Socket} from "socket.io-client";

type SocketInstance = {
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
}

export const useSocket = create<SocketInstance>((set)=>({
    socket: null,
    setSocket: (socket: Socket | null) => set({socket})
}));