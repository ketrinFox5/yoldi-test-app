import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconEye from '../../img/eye-solid.svg';
import { ISignUp } from '../../interfaces/ISignUp';
import { signUpUser } from '../../services/authService';
import { getProfileUser } from '../../services/profleService';
import iconEyeSlash from '../../img/eye-slash.svg';

const Register = (props: {setProfileData: any}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [inputType, setInputType] = useState('password');

    const isValid: boolean = name === '' || email === '' || password === '';

    const navigate = useNavigate();

    // const [formFields, setFormFields] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //   });
      
    //   const [formErrors, setFormErrors] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //   });

    // const handleInputChange = (event: any) => {
    //     const {name, value} = event.target;
    //     setFormFields({
    //         ...formFields,
    //         [name]: value,
    //     });
    // };

    // const validationForm = () => {
    //     const errors = {
    //         name: '',
    //         email: '',
    //         password: ''
    //     };

    //     if (!formFields.name.trim()) {
    //         errors.name = 'Имя обязательно для заполнения';
    //     } else if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(formFields.name)) {
    //         errors.name = 'Имя может содержать только буквы';
    //       }

    //     if (!formFields.email.trim()) {
    //         errors.email = 'Адрес электронной почты обязателен для заполнения';
    //     } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
    //         errors.email = 'Введите действительный адрес электронной почты';
    //     }

    //     if (!formFields.password.trim()) {
    //         errors.password = 'Пароль обязателен для заполнения';
    //     } else if (formFields.password.trim().length < 6) {
    //         errors.password = 'Пароль должен содержать не менее 6 символов';
    //     }

    //     setFormErrors(errors);

    //     return Object.keys(errors).length === 0;
    // } 

    const signUp = (userData: ISignUp) => {
        
         signUpUser(userData).then(data => {
           if ('message' in data) {
            setError(data.message);
           } else if ('value' in data) {
                localStorage.setItem('user-value', data.value);
                getProfileUser(data.value).then(data => {
                    if ('message' in data) {
                        setError(data.message);
                    } else {
                        props.setProfileData(data);
                        navigate('/account');
                    }
               })
           }
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // if(validationForm()) {
        //     const userData: ISignUp = {name: name, email: email, password: password};
        //     signUpUser(userData);
        // }
        const userData: ISignUp = {name: name, email: email, password: password};
        signUp(userData);
    }

    const handleInputType = () => {
        setInputType(prevType => prevType === 'text' ? 'password' : 'text');
    }

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