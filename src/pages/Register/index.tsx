import { useEffect, useState } from 'react';
import iconEye from '../../img/eye-solid.svg';
import { ISignUp } from '../../interfaces/ISignUp';
import iconEyeSlash from '../../img/eye-slash.svg';
import { useAppSelector } from '../../store/store';

const Register = (props: {signUp: any}) => {
    const errorState = useAppSelector(state => state.error.message);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(errorState);
    const [inputType, setInputType] = useState('password');

    const isValid: boolean = name === '' || email === '' || password === '';
 
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const userData: ISignUp = {name: name, email: email, password: password};
        props.signUp(userData);
    }

    const handleInputType = () => {
        setInputType(prevType => prevType === 'text' ? 'password' : 'text');
    }

    useEffect(() => {
        setError(errorState);
    }, [errorState]);

    return <div className="register">
        <h1 className="title">
            Регистрация в Yoldi Agency
        </h1>
        <form onSubmit={handleSubmit} className="form">
            <input value={name} type="text" name="name" placeholder="Имя" required className="input form__field form__field-name paragraph" onChange={e => setName(e.target.value)}/>
            <input value={email} type="email" name="email" placeholder="E-mail" required className="input form__field form__field-email paragraph" onChange={e => setEmail(e.target.value)}/>
            <div className="input form__field form__field-password">
                <input value={password} type={inputType} name="password" required placeholder="Пароль" className="paragraph" onChange={e => setPassword(e.target.value)}/>
                <span className="suffix"><i><img src={inputType === 'text' ? iconEyeSlash : iconEye} alt="" onClick={()=> handleInputType()}/></i></span>
            </div>
            <div className="error paragraph-mini">{error}</div>
            <button className="btn btn__text btn__primary form__btn" type="submit" disabled={isValid}>
                Создать аккаунт
            </button>
        </form>
    </div>
}

export default Register;