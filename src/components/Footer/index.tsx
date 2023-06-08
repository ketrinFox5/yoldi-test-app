const Footer = (props:{ path: string}) => {
    const isLogIn: boolean = props.path === '/login';
    const isSignUp: boolean = props.path === '/signup';
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