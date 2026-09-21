import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

type HeaderProps = {
  email: string;
  isLoggedIn: boolean;
  onSignOut: () => void;
};

function Header({ email, isLoggedIn, onSignOut }: HeaderProps) {
  const location = useLocation();
  const authLink = location.pathname === '/signup' ? '/signin' : '/signup';
  const authLinkText =
    location.pathname === '/signup' ? 'Inicia sesión' : 'Regístrate';

  return (
    <header className='header page__section'>
      <img
        src={logo}
        alt='Logotipo Around The U.S.'
        className='logo header__logo'
      />
      {isLoggedIn ? (
        <div className='header__user'>
          <p className='header__email'>{email}</p>
          <button className='header__button' type='button' onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <Link className='header__link' to={authLink}>
          {authLinkText}
        </Link>
      )}
    </header>
  );
}

export default Header;
