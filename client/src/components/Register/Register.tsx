import { useState } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';

type RegisterProps = {
  onRegister: (email: string, password: string) => Promise<void>;
};

function Register({ onRegister }: RegisterProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void onRegister(email, password);
  }

  return (
    <main className='auth page__section'>
      <h1 className='auth__title'>Regístrate</h1>
      <form className='auth__form' name='register' onSubmit={handleSubmit}>
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
          Regístrate
        </button>
      </form>
      <Link className='auth__link' to='/signin'>
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
    </main>
  );
}

export default Register;
