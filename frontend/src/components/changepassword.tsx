import  { useEffect, useState } from 'react';
import UserService from 'src/services/user.service';
import { useLocation} from 'react-router-dom';
import { frontendEncryptionUtils } from 'src/utils/encryption';
import schema from './auth/signup/schemas/FormSchema'
import { z } from 'zod';
// import 'bootstrap/dist/css/bootstrap.min.css';

const changepassSchema =schema.userSchema.pick({password: true, confirmPassword: true});
changepassSchema.superRefine((data,ctx)=>{
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
})
type changePasswordProps =z.infer<typeof changepassSchema>;
const ChangePassword = () => {
  const [formvalues,setFormvalues]=useState<changePasswordProps>({password:'',confirmPassword:''});
  const [error, setError] = useState<Partial<changePasswordProps>>({})
  const validateField =(fieldName:keyof changePasswordProps,fieldValue:string)=>{
  const fieldErrors={...error};
    try{
      changepassSchema.parse({[fieldName]:fieldValue})
      fieldErrors[fieldName]='';
    }catch(error:any){
      fieldErrors[fieldName]=error.errors[0].message;
    }
    setError(fieldErrors);
  }
  const [contactId, setContactId] =useState<string|null>(null);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jsonOptions = queryParams.get("opts");
    if (jsonOptions) {
      try {
        const decryptedOptions = JSON.parse(
          frontendEncryptionUtils.decrypt(jsonOptions)
        ) as { id: string };
        const encryptedContactId = decryptedOptions.id
        setContactId(encryptedContactId);
        console.log('Contact ID:', encryptedContactId);
      } catch (error) {
        console.log('Invalid query parameters.');
      }
    }
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const fieldErrors = { ...error };
      const { name, value } = e.target;
      setFormvalues({ ...formvalues, [name]: value });
      validateField(name as keyof changePasswordProps, value);
      if (value.length >= 2) {
        fieldErrors[name as keyof changePasswordProps] = "";
        setError(fieldErrors);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleBlur =(e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof changePasswordProps, value);
    handleChange(e);
  }
  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const result = changepassSchema.safeParse(formvalues);
      if (!result.success) {
        const newErrors: Partial<changePasswordProps> = {};
        result.error.errors.forEach((err) => {
          newErrors[err.path[0] as keyof changePasswordProps] = err.message;
          return;
        });
        setError(newErrors);
      }
    
    const Id = parseInt(contactId??'0', 10);
    UserService.changePassword(Id,  formvalues.password).then((result) => {
        debugger
      if (result.status === 200) {
        setMessage(result.data.message??'');
      } else {
        console.log(result.data.message??'');
      }
    }, (_err) => {
      console.log(`An error occurred while changing the password. :${error}`);
    });
    } catch (error) {
      
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">Change Password</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="newPassword">New Password</label>
              <input
              maxLength={30}
                type="password"
                id="newPassword"
                name='password'
                className="form-control"
                value={formvalues.password}
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />
                  {error.password && (
            <div className="form-row mb-1">
              <div className="col">
                <span className="text-danger">{error.password}</span>
              </div>
            </div>
          )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
              maxLength={30}
                type="password"
                id="confirmPassword"
                name='confirmPassword'
                className="form-control"
                value={formvalues.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />
              {error.confirmPassword && (
            <div className="form-row mb-1">
              <div className="col">
                <span className="text-danger">{error.confirmPassword}</span>
              </div>
            </div>
          )}
            </div>
            <button  type="submit" className="btn btn-primary w-100">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;