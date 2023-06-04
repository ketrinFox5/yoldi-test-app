import { useState } from 'react';
import iconEye from '../../img/eye-solid.svg';
import iconEyeSlash from '../../img/eye-slash.svg';
import { ILogIn } from '../../interfaces/ILogIn';
import { loginUser } from '../../services/authService';
import { getProfileUser } from '../../services/profleService';
import { useNavigate } from 'react-router-dom';

const LogIn = (props: {setProfileData: any, setPath: any}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [inputType, setInputType] = useState('password');
    const navigate = useNavigate();

    const isValid: boolean = email === '' || password === '';

    const login = (userData: ILogIn) => {
        
        loginUser(userData).then(data => {
          if ('message' in data) {
           setError(data.message);
          } else if ('value' in data) {
            localStorage.setItem('user-value', data.value);
            getProfileUser(data.value).then(data => {
                   if ('message' in data) {
                       setError(data.message);
                   } else {
                        props.setProfileData(data);
                        props.setPath('/account');
                        navigate('/account');
                   }
              })
          }
       });
   }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const userData: ILogIn = {email: email, password: password};
        login(userData);
    }

    const handleInputType = () => {
        setInputType(prevType => prevType === 'text' ? 'password' : 'text');
        // if (inputType === 'text') {
        //     iconPassword = iconEyeSlash;
        // } else {
        //     iconPassword = iconEye;
        // }
    }

    return <div className="login">
        <h1 className="title">
            Вход в Yoldi Agency
        </h1>
        <form onSubmit={handleSubmit} className="form">
            <input value={email} type="email" placeholder="E-mail" required className="input form__field form__field-email paragraph" onChange={e => setEmail(e.target.value)}/>
            <div className="input form__field form__field-password">
                <input value={password} type={inputType} required placeholder="Пароль" className="paragraph" onChange={e => setPassword(e.target.value)}/>
                <span className="suffix"><i><img src={inputType === 'text' ? iconEyeSlash : iconEye} alt="" onClick={()=> handleInputType()}/></i></span>
            </div>
            <div className="error paragraph-mini">{error}</div>
            <button disabled={isValid} className="btn btn__text btn__primary form__btn" type="submit" >
                Войти
            </button>
        </form>
    </div>
}

export default LogIn;