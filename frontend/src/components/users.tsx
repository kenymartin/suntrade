
import { useState, useEffect } from "react";
import axios from "../api/axios";

const Users = () => {
    const [users, setUsers] = useState<any>();

    useEffect(() => {
        let isMounted = true;
        const control = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axios.get("/users", {
                    signal: control.signal,
                });
                isMounted && setUsers(response.data);
            } catch (error) {
              console.log(error);
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            control.abort();
        }
    },[])
    return (
      <article>
        <h2>User List</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((user:any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>Data not found</p>
        )}
      </article>
    );
}
 
export default Users;