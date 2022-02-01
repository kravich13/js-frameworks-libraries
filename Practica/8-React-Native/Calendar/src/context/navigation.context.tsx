import React, { FC, SetStateAction, useState } from 'react';

interface INavigator_Context {
  selectedDate: number;
  setSelectedDate: React.Dispatch<SetStateAction<number>>;
}

export const NavigationContext = React.createContext<INavigator_Context | null>(null);

export const NavigationContextProvider: FC = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(0);

  return <NavigationContext.Provider value={{ selectedDate, setSelectedDate }}>{children}</NavigationContext.Provider>;
};
