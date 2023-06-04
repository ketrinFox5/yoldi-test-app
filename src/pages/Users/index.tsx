import { useEffect } from 'react';
import { useState } from 'react';
import UserCard from '../../components/UserCard';
import { getUser } from '../../services/userService';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    const loadUsers = () => {
        getUser().then(data => {
            if ('message' in data) {
                setError(data.message);
            } else {
                const users = data.slice(0,10);
                setUsers(users);
            }
        });
    }

    useEffect(() => {
        loadUsers();
    }, [])

    return(
        <div className="users">
            <h1 className="title">
                Список аккаунтов
            </h1>
            <div className="users__list">
                {users.slice(0,10).map((user) => (
                     <UserCard user={user}/>
                ))}
                
            </div>
        </div>
    )
}

export default Users;