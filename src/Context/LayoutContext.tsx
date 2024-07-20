import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextProps {
  layoutMode: 'horizontal' | 'vertical';
  toggleLayoutMode: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const toggleLayoutMode = () => {
    setLayoutMode((prevMode) => (prevMode === 'horizontal' ? 'vertical' : 'horizontal'));
  };

  return (
    <LayoutContext.Provider value={{ layoutMode, toggleLayoutMode }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextProps => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
