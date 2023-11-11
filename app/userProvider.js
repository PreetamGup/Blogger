'use client';

import { createContext, useContext, useState } from 'react';


export const UserContext = createContext(null);


export default function UserProvider({ children }) {
    
const [user, setUser]= useState({
    name:null,
    isLoggedIn:false
  })
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}