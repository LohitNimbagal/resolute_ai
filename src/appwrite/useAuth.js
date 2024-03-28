import { create } from 'zustand'

export const useAuth = create((set) => ({
    status: false,
    userData: null,
    login: () => set((state) => ({status: true })),
    logout: () => set((state) => ({ status: false, userData: null })),
    setUserData: (data) => set((state) => ({userData: data })) 
}))