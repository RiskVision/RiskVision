// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Recupera usuarios de localStorage al inicializar
  const [usuarios, setUsuarios] = useState(() => {
    const savedUsuarios = localStorage.getItem('usuarios');
    return savedUsuarios ? JSON.parse(savedUsuarios) : [];
  });

  // Usa useEffect para actualizar localStorage cuando cambien los usuarios
  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  const agregarUsuario = (usuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);
  };

  return (
    <UserContext.Provider value={{ usuarios, agregarUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
