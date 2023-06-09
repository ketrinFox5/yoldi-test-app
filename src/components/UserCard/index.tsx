import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IProfile } from '../../interfaces/IProfile';

const UserCard = (props: {user: IProfile}) => {
    const [image, setImage] = useState(props.user.image?.url);
    const firstCharInName: string | undefined = props.user?.name.charAt(0);
    const isImage: boolean = image !== '';

    useEffect(() => {
        if (!image) {
            setImage(props.user.image?.url)
        }
    }, [props.user.image?.url])

    return(
        <Link to={`/account/${props.user.slug}`}>
            {props.user &&
                <div className="user__card" key={props.user.slug} >
                        <div className="avatar avatar__mini subtitle">
                            {isImage && 
                                <img src={image} alt="" />
                            }
                            {!isImage &&
                                firstCharInName
                            } 
                        </div>
                        <div className="user__card-text">   
                            <div className="btn__text">
                                {props.user.name}
                            </div>
                    
                            <div className="paragraph gray">
                                {props.user.email}
                            </div>
                        </div> 
                </div> 
            }
        </Link>
    )
}

export default UserCard;