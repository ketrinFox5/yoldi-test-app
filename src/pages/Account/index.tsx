import Cover from '../../components/Cover'
import UserInfo from '../../components/UserInfo';
import { IProfile } from '../../interfaces/IProfile';
import { useAppSelector } from '../../store/store';

const Account = () => {
    const user = useAppSelector(state => state.user.data);
    const guest = useAppSelector(state => state.guest.data);
    const isOwner = useAppSelector(state => state.isOwner.value);
    const userInfo: IProfile | null = isOwner ? user : guest;
 
    return(
        <section className="account">
            {userInfo && <Cover cover={userInfo.cover} userName={userInfo.name}/>}
            {userInfo && <UserInfo profileData={userInfo}/>}
        </section>
    );
}

export default Account;