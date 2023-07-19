import { IImage } from '../../interfaces/IImage';
import iconImage from '.././../img/image.svg';
import iconUpload from '../../img/upload-solid.svg';
import iconDelete from '../../img/trash-solid.svg';
import { useState } from 'react';
import { useRef } from 'react';
import { postImage } from '../../services/imageService';
import { updateProfileUser } from '../../services/profleService';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/store';

const Cover = (props: {cover: IImage | null, userName: string | undefined}) => {

    const isOwner = useAppSelector(state => state.isOwner.value);
    const isLoading = useAppSelector(state => state.isLoading.value);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState('');
    const [coverImg, setCoverImg] = useState(props.cover);

    useEffect(() => {
        setCoverImg(props.cover);
    }, [props.cover])

    const handleFileChange = (event: any) => {
        handleFileUpload(event.target.files[0]);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
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
                setCoverImg(data);
                const value = localStorage.getItem('user-value');
                updateProfileUser({coverId: data.id, name: props.userName as string, slug: value! }, value as string);
            }   
        })
      };

    const deleteCoverImg = () => {
        const value = localStorage.getItem('user-value');
        updateProfileUser({coverId: null, name: props.userName as string, slug: value!}, value as string).then(data => {
            if ('message' in data) {
                setError(data.message);
            } else {
                setCoverImg(null);
            }
        });
    }
    if (isLoading) return null;
    
    return(
        <div className="cover" onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            {coverImg &&
                <img src={coverImg?.url} alt="" className="cover__img"/>
            }
            {isHovered && isOwner &&
                <div className="cover__update">
                    {coverImg !== null ? 
                        <button className="btn btn__text btn__secondary btn__master" onClick={() => {deleteCoverImg()}}>
                        <span className="prefix"><i><img src={iconDelete} alt=""/></i></span>
                            Удалить
                        <span className="suffix"><i><img src={iconImage} alt=""/></i></span>
                    </button> :     
                    <>
                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={inputFileRef}/>
                        <button className="btn btn__text btn__secondary btn__master" onClick={() => inputFileRef.current?.click()}>
                            <span className="prefix"><i><img src={iconUpload} alt=""/></i></span>
                                Загрузить
                            <span className="suffix"><i><img src={iconImage} alt=""/></i></span>
                        </button> 
                    </>
                    } 
                </div>
            }
        </div>
    );
}

export default Cover;