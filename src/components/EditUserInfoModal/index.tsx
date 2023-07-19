import { useEffect } from 'react';
import { useState } from 'react';
import { IProfile } from '../../interfaces/IProfile';
import { IUpdateProfile } from '../../interfaces/IUpdateProfile';
import { updateProfileUser } from '../../services/profleService';
import { setError } from '../../store/error/error.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { editUser, openEditModal } from '../../store/user/user.slice';

const EditUserInfoModal = (props: {userInfo: IProfile | null}) => {
    const [name, setName] = useState(props.userInfo!.name);
    const [slug, setSlug] = useState(props.userInfo?.slug);
    const [description, setDescription] = useState(props.userInfo?.description === null ? '' : props.userInfo?.description);
    // const [error, setError] = useState(null);

    const error = useAppSelector(state => state.error.message);
    const dispatch = useAppDispatch();


    const handleSubmit = (event: any) => {
        event.preventDefault();

        const updateProfileData: IUpdateProfile = {
            name: name,
            description: description === '' ? null : description,
            slug: slug,
        };

        const value = localStorage.getItem('user-value');
        if (value !== null) {
            updateProfileUser(updateProfileData, value).then(data => {
                if ('message' in data) {
                    dispatch(setError(data.message));
                    // setError(data.message);
                } else {
                    dispatch(editUser(data));
                    dispatch(openEditModal(false));
                }
            });
        }        
    }

    const onCloseModal = () => {
        dispatch(openEditModal(false));
        document.body.style.overflow = 'auto';
    }

    return(
        <div className="modal">
            <div className="modal__content">
                <div className="title">
                    Редактировать профиль
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user-name" className="btn__text gray">
                        Имя
                        <input className="input paragraph" type="text" required name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label htmlFor="user-slug" className="btn__text gray">
                        Адрес профиля
                    </label>
                    <div className="modal__slug">
                            <span className="slug paragraph gray">example.com/</span>
                            <input type="text" name="user-slug" required value={slug} onChange={(e)=> setSlug(e.target.value)} className="input paragraph"/>
                        </div>
                    <label htmlFor="user-description" className="btn__text gray ">
                        Описание
                        <textarea name="user-description" className="input paragraph" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </label>
                    {error && 
                        <div>
                            {error}
                        </div>
                    }
                    <div className="modal__btns">
                        <button onClick={onCloseModal} className="btn btn__text btn__secondary modal__btn">
                            Отмена
                        </button>
                        <button type="submit" className="btn btn__text btn__primary modal__btn" >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserInfoModal;