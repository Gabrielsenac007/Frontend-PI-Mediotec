import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const RoleContext = createContext();

//Hook para usar o context em outros componentes
export const useRole = () => useContext(RoleContext);

//Desabilitando o eslint para prop-types(não é necessário, não estamos usando typescript)
// eslint-disable-next-line react/prop-types
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  //Use effect pega o token do localStorage e decoda o role (Para quando o usuário der reload após o login, ou seja, dentro da plataforma)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        //Seta a role como a role que está no token
        setRole(decoded.role);
      } catch (error) {
        console.error('Invalid token:', error);
        setRole(null);
      }
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};