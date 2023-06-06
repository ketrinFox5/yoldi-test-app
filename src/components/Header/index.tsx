import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../img/logo-wrapper.svg";
import { IHeader } from '../../interfaces/IHeader';
import { IProfile } from '../../interfaces/IProfile';
import { getProfileUser } from '../../services/profleService';

const Header = (props: IHeader) => {
    const [userInfo, setUserInfo] = useState<IProfile | null>(props.userData);
    const image = userInfo?.image ? userInfo?.image : null;
    const firstCharInName: string = userInfo?.name ?  userInfo?.name.charAt(0): '';
    const navigate = useNavigate();
    const toSignUp = () => {
        navigate('/login');
    }


    const reloadUserInfo = () => {
        const value = localStorage.getItem('user-value');
        if (value !== null) {
            getProfileUser(value).then(data => {
                if ('message' in data) {
                    // setError(data.message);
                } else {
                    setUserInfo(data);
                }
            })
        }
    }

    useEffect(() => {
        if (!userInfo) {
            // reloadUserInfo();
            setUserInfo(props.userData);
        }
        // localStorage.getItem('user-value') === '';
        if (props.url === '/login' ) {
            setUserInfo(null);
        }
    }, [props.userData])

    return <header className="header paragraph">
            <div className="header__logo">
                <img src={`${logo}`} alt="Yoldi" />
                <div className="header__text">
                    Разрабатываем и запускаем сложные веб проекты
                </div>
            </div>
            {!userInfo &&
                <button className="btn btn__text btn__secondary" onClick={() => {toSignUp()}}>
                    Войти
                </button>
            }
            {userInfo &&
                <div className="header__user">
                    <div className="header__user-name">
                       {userInfo.name}
                    </div>
                    <div className="avatar avatar__mini subtitle">
                        {image && 
                            <img src={image.url} alt="" />
                        }
                        {!image &&
                            firstCharInName
                        } 
                    </div>
                </div>
            }
    </header>
}

export default Header;