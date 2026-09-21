import { useState } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';

type LoginProps = {
  onLogin: (email: string, password: string) => Promise<void>;
};

function Login({ onLogin }: LoginProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void onLogin(email, password);
  }

  return (
    <main className='auth page__section'>
      <h1 className='auth__title'>Inicia sesión</h1>
      <form className='auth__form' name='login' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          name='email'
          onChange={(event) => setEmail(event.target.value)}
          placeholder='Correo electrónico'
          required
          type='email'
          value={email}
        />
        <input
          className='auth__input'
          name='password'
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Contraseña'
          required
          type='password'
          value={password}
        />
        <button className='auth__button' type='submit'>
          Iniciar sesión
        </button>
      </form>
      <Link className='auth__link' to='/signup'>
        ¿Aún no eres miembro? Regístrate aquí
      </Link>
    </main>
  );
}

export default Login;
