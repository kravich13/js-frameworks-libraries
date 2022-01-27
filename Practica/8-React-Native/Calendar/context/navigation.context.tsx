import React from 'react';

interface INavigator_Context {
  selectedDate: number;
}

export const NavigationContext = React.createContext<INavigator_Context | null>(null);
