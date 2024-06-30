import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    
  });

  useEffect(() => {
    // Simulate fetching user data from some authentication provider
    const fetchUser = async () => {
      try {
        // Your authentication logic goes here
        // For demonstration purposes, let's assume user is fetched after 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user: User = {
          id: 1,
          username: 'exampleUser',
          email: 'user@example.com',
        };
        setAuthState({ user, loading: false });
      } catch (error) {
        console.error('Error fetching user:', error);
        setAuthState({ user: null, loading: false });
      }
    };

    fetchUser();
  }, []);

  return authState;
};

