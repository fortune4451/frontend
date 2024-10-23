import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@chakra-ui/react';

type GlobalData = {
  userData: any;
  setUserData: (data: any) => void;
  adminData: any;
  setAdminData: (data: any) => void;
  isLoading: boolean;
};

const GlobalDataContext = createContext<GlobalData | undefined>(undefined);

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Fetch data for both user and admin sections here
  const fetchData = async () => {
    try {
      const userResponse = await fetch('/api/userdata'); // Replace with your endpoint
      const adminResponse = await fetch('/api/admindata'); // Replace with your endpoint

      if (userResponse.ok && adminResponse.ok) {
        const user = await userResponse.json();
        const admin = await adminResponse.json();

        setUserData(user);
        setAdminData(admin);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render loading spinner until data is fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <GlobalDataContext.Provider value={{ userData, setUserData, adminData, setAdminData, isLoading }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataContext;
