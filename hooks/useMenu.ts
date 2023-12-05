import {create} from "zustand";

interface useMenuProps{
    isActive: boolean;
    setIsActive: (isOpen: boolean) => void;
}

export const useMenu = create<useMenuProps>((set)=>({
    isActive: false,
    setIsActive: (isOpen: boolean) => set({isActive: isOpen}),
}));