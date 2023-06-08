import { useEffect } from 'react';
import { useState } from 'react';
import UserCard from '../../components/UserCard';
import { IProfile } from '../../interfaces/IProfile';
import { getUser } from '../../services/userService';

const Users = () => {

    const [users, setUsers] = useState<IProfile[]>([]);
    const [error, setError] = useState();

    const loadUsers = () => {
        getUser().then(data => {
            if ('message' in data) {
                setError(data.message);
            } else {
                const users = data.filter((user: IProfile) => user.image);
                setUsers(users);
                // setUsers(prevData => [...prevData, ...data]);
            }
        });
    }

    useEffect(() => {
        loadUsers();

        //динамимчная загрузка данных при скролле

        // const handleScroll = () => {
        //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        //         loadUsers();
        //     }
        // };
    
        // window.addEventListener('scroll', handleScroll);

        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    }, [])

    return(
        <div className="users">
            <h1 className="title">
                Список аккаунтов
            </h1>
            <div className="users__list">
                {users.map((user) => (
                     <UserCard user={user}/>
                ))}
                
            </div>
        </div>
    )
}

export default Users;