import exios from '../api/axios';
import { useAuth } from './useAuth';



export const useRefreshToken = () => {
    
    const {  } = useAuth();

    const refresh = async () => {
        try {
            const response = await exios.get("/auth/refresh", {
              withCredentials: true,
            });
            // setAuthState((prev: any) => {
            //   console.log(JSON.stringify(prev));
            //   console.log(JSON.stringify(response.data));
            //   return { ...prev, accessToken: response.data.accessToken };
            // });
            return response.data.accessToken;
        } catch (error) {
            // console.log(error);
        }
    }

    return refresh;
}
