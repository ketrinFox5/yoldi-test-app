import { useEffect } from 'react';
import { useState } from 'react';
import UserCard from '../../components/UserCard';
import { IProfile } from '../../interfaces/IProfile';
import { getUser } from '../../services/userService';
import { setError } from '../../store/error/error.slice';
import { setPathUsers } from '../../store/path/path.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Users = () => {
    const errorState = useAppSelector(state => state.error.message);
    const [users, setUsers] = useState<IProfile[]>([]);
    const [errorMsg, setErrorMsg] = useState(errorState);
    const dispatch = useAppDispatch();

    const loadUsers = () => {
        getUser().then(data => {
            if ('message' in data) {
                dispatch(setError(data.message));
            } else {
                const users = data.filter((user: IProfile) => user.image);
                dispatch(setError(null));
                setUsers(users);
                // setUsers(prevData => [...prevData, ...data]);
                dispatch(setPathUsers());
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
            <div className="error paragraph-mini">{errorMsg}</div>
            <div className="users__list">
                {users.map((user) => (
                    <UserCard user={user}/>
                ))}
                
            </div>
        </div>
    )
}

export default Users;