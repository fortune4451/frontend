'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface DepositContextProps {
  gateway: string;
  amount: number;
  setGateway: (gateway: string) => void;
  setAmount: (amount: number) => void;
}

const DepositContext = createContext<DepositContextProps | undefined>(undefined);

export const DepositProvider = ({ children }: { children: ReactNode }) => {
  const [gateway, setGateway] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  return (
    <DepositContext.Provider value={{ gateway, amount, setGateway, setAmount }}>
      {children}
    </DepositContext.Provider>
  );
};

export const useDeposit = () => {
  const context = useContext(DepositContext);
  if (!context) {
    throw new Error('useDeposit must be used within a DepositProvider');
  }
  return context;
};
