import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(
    {
        isAuthenticated: false,
        setIsAuthenticated: () => {},
    }
);


