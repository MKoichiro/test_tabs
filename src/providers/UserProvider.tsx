import React, { FC, ReactNode, createContext, useState } from 'react';
import { user as userInstance } from '../data/entity';
import { User } from '../data/classes/User';

interface UserContextProps {
  user: User | null;
  updateUser: (newUser: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
});


interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: FC<UserProviderProps> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(userInstance);
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  }
  const value = { user, setUser, updateUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;