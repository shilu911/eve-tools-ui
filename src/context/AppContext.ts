import React from 'react';

export interface AppContextType {
  language: string;
}

export const defaultAppContextValue: AppContextType = {
  language: 'zh'
}

export default React.createContext(defaultAppContextValue);
