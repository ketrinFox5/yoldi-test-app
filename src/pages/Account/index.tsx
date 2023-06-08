import Cover from '../../components/Cover'
import UserInfo from '../../components/UserInfo';
import { IProfile } from '../../interfaces/IProfile';

const Account = (props: {profileData: IProfile | null, isOwner: boolean, signOut: any, isLoading: boolean}) => {
    
    return(
        <section className="account">
            {props.profileData && <Cover cover={props.profileData.cover} userName={props.profileData.name} isOwner={props.isOwner} isLoading={props.isLoading}/>}
            {props.profileData && <UserInfo profileData={props.profileData}  isOwner={props.isOwner} signOut={props.signOut} isLoading={props.isLoading}/>}
        </section>
    );
}

export default Account;