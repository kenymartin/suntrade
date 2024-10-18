import React,{useState, useEffect} from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { frontendEncryptionUtils } from "../utils/encryption";
import UserService  from '../services/user.service'
import { AxiosError } from "axios";
import 'public/assets/css/style.css';
//import ApiResponse from '../services/interfaces/ApiResponse'
// import { AccountActivationError } from "@shared/utils/enums";
// import { useQuery } from "react-query";

const ConfirmRegistration:React.FC = () => {
  type options = {
    id: any;
    isReactivation: boolean;
  };
  const navigate = useNavigate();
  debugger
    const [contactId, setContactId] =useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);
    const [message, setMessage] = useState<string|null>(null);
    const [isLinkSent, setIsLinkSent] = useState(false);
    const [_isFading, setIsFading] = useState(false);
    const location = useLocation();
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const jsonOptions = queryParams.get('opts')
      if (jsonOptions) {
        debugger
        try {
          const decryptedOptions=JSON.parse(frontendEncryptionUtils.decrypt(jsonOptions)) as options
          const encryptedContactId = String(decryptedOptions.id)
          setContactId(encryptedContactId);
          const Id = parseInt(encryptedContactId);
          const isReactivation =decryptedOptions.isReactivation
           UserService.ActiveUser(Id,isReactivation).then((result) => {
            if(result.data.status === 200) {
              setMessage(result.data.data?.message);
              console.log("Success==>",message);
            }
          }, (err) => {
            if(err instanceof AxiosError) {
              console.log(err)
              setError(err.response?.data.message);
            } 
          });
        } catch (error) {
          setError(`Invalid or corrupted ID line line 40. ${error}`);
        }
      } else {
        setError("No ID provided.");
      }
    }, [location.search,isLinkSent]);

  const handleResendActivationLink=(event: React.MouseEvent<HTMLButtonElement>): void =>{
    debugger
    event.preventDefault();
    setIsFading(true)
    const id =parseInt(contactId as string);
    UserService.ResendActivationLink(id).then((result) => {
      if(result.status === 200) {
        setMessage(result.data.message??'');
        setIsLinkSent(true);
        navigate('/linksent');
      //  setTimeout(() => {
      //   setMessage(result.data.message??'');
      //   setIsFading(false)
      //   setIsLinkSent(true)
      //   console.log('Link sent'); 
      //  }, 500);
      }
      if(isLinkSent) {
        console.log('Link sent successfully')
      }
    }, (err) => {
      if(err instanceof AxiosError) {
        console.log(err)
        setError(err.response?.data.message);//`Activation link has expired.The acount cannot be activated after 24 hours`
      } 
    });
  }

  return ( 
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {
        error ? (
          <div style={{ color: 'red' }}>
            <p>
              {
                error.includes("active") || error.includes("expired") 
                ? error 
                : "An error occurred."
              }
            </p>
            {error.includes("active") && (
              <Link to="/login">
                <button className="btn btn-primary rounded">
                  Go to Login
                </button>
              </Link>
          )}
          {error.includes("expired") && (
            <button hidden={isLinkSent}
              className="btn btn-primary rounded" 
              onClick={handleResendActivationLink}
            >
              Resend Activation Link
            </button>
          )}
          </div>
        ) : (
          <div>
            <h1>{message}</h1>
            {message && (
              <Link to="/login">
                <button className="btn btn-primary rounded">
                  Go to Login
                </button>
              </Link>
            )}
          </div>
        )
      }
    </div>
  );

}
 
export default ConfirmRegistration;