import  { useEffect, useState } from 'react';
import UserService from 'src/services/user.service';
import { useLocation} from 'react-router-dom';
import { frontendEncryptionUtils } from 'src/utils/encryption';
// import 'bootstrap/dist/css/bootstrap.min.css';


const ChangePassword = () => {
    debugger
//   const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactId, setContactId] =useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);
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
        setError('Invalid query parameters.');
      }
    }
  }, [location.search]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    debugger
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation password do not match.');
      return;
    }
    // Add your password change logic here (API call or other handling)
    const Id = parseInt(contactId??'0', 10);

    UserService.changePassword(Id, newPassword).then((result) => {
        debugger
      if (result.status === 200) {
        setMessage(result.data.message??'');
      } else {
        setError(result.data.message??'');
      }
    }, (_err) => {
      setError(`An error occurred while changing the password. :${error}`);
    });
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">Change Password</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group mb-3">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div> */}
            <div className="form-group mb-3">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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