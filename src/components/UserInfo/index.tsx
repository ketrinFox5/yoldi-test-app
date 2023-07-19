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
import { useAppDispatch, useAppSelector } from '../../store/store';
import { openEditModal, setSignOut, setUser } from '../../store/user/user.slice';
import { setError } from '../../store/error/error.slice';

const UserInfo = (props: {profileData: IProfile}) => {
    const errorState = useAppSelector(state => state.error.message);

    const [userInfo, setUserInfo] = useState<IProfile | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [updateImg, setUpdateImg] = useState<IProfile['image']>(null);
    const [errorMsg, setErrorMsg] = useState(errorState);
    

    const firstCharInName: string = userInfo ? userInfo.name.charAt(0): '';
    const inputFileImgRef = useRef<HTMLInputElement>(null);

    const isOwner = useAppSelector(state => state.isOwner.value);
    const isLoading = useAppSelector(state => state.isLoading.value);

    const isOpenModalState = useAppSelector(state => state.user.isEditModalOpen);
    const [showModal, setShowModal] = useState(isOpenModalState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setErrorMsg(errorState);
    }, [errorState]);

    useEffect(()=> {
        setUserInfo(props.profileData);
    }, [props.profileData]);

    useEffect(() => {
        setShowModal(isOpenModalState)
    }, [isOpenModalState]);

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
                dispatch(setError(data.message));
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
    

    const handleEdit = () => {
        dispatch(openEditModal(true));
        document.body.style.overflow = 'hidden';
    }

    const signOut = () => {
        dispatch(setSignOut(true));
    }

    if (isLoading) return null;

    return(
        <div className="user-info">
            <div className={`avatar avatar__big ${isHovered && isOwner ? 'avatar__big_hover' : ''}`} onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={() => isOwner && inputFileImgRef.current?.click()}>
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={inputFileImgRef}/>
                {isHovered && isOwner &&
                    <img src={iconCamera} alt="" className="icon-camera"/>
                } 
                {updateImg ? <img src={updateImg.url} alt="" className={isHovered && isOwner ? 'd-none' : 'd-block'}/> 
                : <div className={isHovered && isOwner ? 'd-none' : 'd-block'}>{firstCharInName}</div> }
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
                {isOwner &&
                    <button className="btn btn__text btn__secondary btn__master" onClick={handleEdit}>
                        <span className="prefix"><i><img src={iconEdit} alt="" /></i></span>
                        Редактировать
                    </button>
                }
                {showModal && <EditUserInfoModal userInfo={userInfo}/>}
            </div>
            <div className="user-info__text paragraph">
                {userInfo?.description}
            </div>
            <div className="error paragraph-mini">{errorMsg}</div>
            {isOwner &&
                <button className="btn btn__text btn__secondary btn__master" onClick={signOut}>
                    <span className="prefix"><i><img src={iconSignOut} alt="" /></i></span>
                    Выйти
                </button>
            }
        </div>
    );
}

export default UserInfo;