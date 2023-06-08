import { useState } from 'react';
import iconEye from '../../img/eye-solid.svg';
import iconEyeSlash from '../../img/eye-slash.svg';
import { ILogIn } from '../../interfaces/ILogIn';
import { useEffect } from 'react';

const LogIn = (props: { login: any, error: string}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [inputType, setInputType] = useState('password');

    const isValid: boolean = email === '' || password === '';

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const userData: ILogIn = {email: email, password: password};
        props.login(userData);
    }

    const handleInputType = () => {
        setInputType(prevType => prevType === 'text' ? 'password' : 'text');
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