import React, { createContext, useState, useContext } from 'react';
import { Navigator } from 'expo-router';
import { apiKey } from '@/constants/api';
import axios from 'axios';

const MenuContext = createContext();

export const ContextProvider = ({children}) => {
    const [detalles,setDetalles]=useState({})
    const [idDetalles,setIdDetalles]=useState(1)
    const [menu,setMenu]=useState([])

    
   
    const value = {menu,setMenu, detalles,setDetalles,idDetalles,setIdDetalles};

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
    return useContext(MenuContext);
};