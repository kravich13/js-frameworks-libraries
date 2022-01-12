import React from 'react';

interface IAppContext {
  colorScheme: 'light' | 'dark';
}

export const Context = React.createContext<IAppContext | null>(null);
