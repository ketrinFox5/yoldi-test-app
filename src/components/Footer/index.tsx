import { useAppSelector } from '../../store/store';

const Footer = () => {
    const path = useAppSelector(state => state.path.value);
    const isLogIn: boolean = path === '/login';
    const isSignUp: boolean = path === '/signup';
    const link: string = isLogIn ? '/signup' : '/login';

    if (!isLogIn && !isSignUp) {
        return null;
    }
    
    return (
    <footer className="footer paragraph">
           { isLogIn ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'} <a href={link}><span className="footer__link">{isLogIn ? 'Зарегистрироваться' : 'Войти'}</span></a>
    </footer>
    )
}

export default Footer;