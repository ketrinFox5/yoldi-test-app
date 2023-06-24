import { useState } from 'react';
import { IProfile } from '../../interfaces/IProfile';
import iconEdit from '../../img/pen-solid.svg';
import iconSignOut from '../../img/sign-out-alt-solid.svg';
import iconCamera from '../../img/camera-solid.svg';
import { useRef } from 'react';
import { postImage } from '../../services/imageService';
import { useEffect } from 'react';
import { updateProfileUser } from '../../services/profleService';
import EditUserInfoModal from '../EditUserInfoModal';

const UserInfo = (props: {profileData: IProfile | null, isOwner: boolean, signOut: any, isLoading: boolean}) => {
    const [userInfo, setUserInfo] = useState<IProfile | null>(props.profileData);
    const [isHovered, setIsHovered] = useState(false);
    const [updateImg, setUpdateImg] = useState<IProfile['image']>(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const firstCharInName: string =props.profileData ? props.profileData.name.charAt(0): '';
    const inputFileImgRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        setUserInfo(props.profileData);
    }, [props.profileData]);

    useEffect(() => {
        if (props.profileData) {
            setUpdateImg(props.profileData?.image);
        }
    }, [props.profileData?.image]);
   
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFileChange = (event: any) => {
        handleFileUpload(event.target.files[0]);
    };

    const handleFileUpload = (selectedFile: File) => {
        if (!selectedFile) {
          return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        postImage(formData).then(data => {
            if ('message' in data) {
                setError(data.message);
            } else if ('url' in data) {
                setUpdateImg(data);
                const value = localStorage.getItem('user-value');
             
                updateProfileUser({name: userInfo!.name,
                    slug: value!,
                    imageId: data.id,
                    description: userInfo?.description,
                }, value as string);
            }   
        })
      };
    
    const onSave = (data: IProfile) => {
        setUserInfo(data);
    }

    const handleEdit = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    }

    const handleClose = () => {
        setShowModal(false);
        document.body.style.overflow = 'auto';
    }

    const signOut = () => {
        props.signOut();
    }
    if (props.isLoading) return null;

    return(
        <div className="user-info">
            <div className={`avatar avatar__big ${isHovered && props.isOwner ? 'avatar__big_hover' : ''}`} onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={() => props.isOwner && inputFileImgRef.current?.click()}>
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={inputFileImgRef}/>
                {isHovered && props.isOwner &&
                    <img src={iconCamera} alt="" className="icon-camera"/>
                } 
                {updateImg ? <img src={updateImg.url} alt="" className={isHovered && props.isOwner ? 'd-none' : 'd-block'}/> 
                : <div className={isHovered && props.isOwner ? 'd-none' : 'd-block'}>{firstCharInName}</div> }
            </div>
            <div className="user-info__details">
                <div>
                    <div className="title">
                        {userInfo?.name} 
                    </div>
                    <div className="paragraph gray">
                        {userInfo?.email}
                    </div>
                </div>
                {props.isOwner &&
                    <button className="btn btn__text btn__secondary btn__master" onClick={handleEdit}>
                        <span className="prefix"><i><img src={iconEdit} alt="" /></i></span>
                        Редактировать
                    </button>
                }
                {showModal && <EditUserInfoModal userInfo={userInfo} onClose={handleClose} onSave={onSave}/>}
            </div>
            <div className="user-info__text paragraph">
                {userInfo?.description}
            </div>
            {props.isOwner &&
                <button className="btn btn__text btn__secondary btn__master" onClick={() => {signOut()}}>
                    <span className="prefix"><i><img src={iconSignOut} alt="" /></i></span>
                    Выйти
                </button>
            }
        </div>
    );
}

export default UserInfo;