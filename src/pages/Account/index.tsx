import { useEffect } from 'react';
import Cover from '../../components/Cover'
import UserInfo from '../../components/UserInfo';
import { IProfile } from '../../interfaces/IProfile';
import { getProfileUser } from '../../services/profleService';
import { useParams } from 'react-router-dom'
import { getUserBySlug } from '../../services/userService';
import { useState } from 'react';

const Account = (props: {profileData: IProfile | null, setProfileData?: any}) => {
    const [isOwner, setIsOwner] = useState(false);
    const [userInfo, setUserInfo] = useState(props.profileData);

    const reloadUserInfo = () => {
        const value = localStorage.getItem('user-value');
        if (value !== null) {
            getProfileUser(value).then(data => {
                if ('message' in data) {
                    // setError(data.message);
                } else {
                    setUserInfo(data);
                    props.setProfileData(data);
                }
            })
        }
    }

    const getGuestInfo = (slug: string) => {
        getUserBySlug(slug).then(data => {
            if ('message' in data) {

            } else {
               setUserInfo(data);
            }
        })
        
    }

    const { slug } = useParams();

    useEffect(() => {
        // reloadUserInfo();
        if (slug && slug !== props.profileData?.slug) {
            getGuestInfo(slug);
            setIsOwner(false);
        } else {
            reloadUserInfo();
            setIsOwner(true);
        }
    }, []);
    
    return(
        <section className="account">
            {userInfo && <Cover cover={userInfo.cover} userName={userInfo.name} isOwner={isOwner}/>}
            {userInfo && <UserInfo profileData={userInfo} setProfileData={props.setProfileData} isOwner={isOwner}/>}
        </section>
    );
}

export default Account;