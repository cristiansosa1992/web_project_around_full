import { useContext, useState } from 'react';
import type React from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || '');
  const [description, setDescription] = useState(currentUser?.about || '');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  }

  return (
    <form
      className='popup__form'
      id='edit-profile-form'
      name='edit-profile-form'
      noValidate
      onSubmit={handleSubmit}
    >
      <label className='popup__field'>
        <input
          id='name'
          className='popup__input popup__input_type_name'
          name='name'
          placeholder='Nombre'
          minLength={2}
          maxLength={40}
          required
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <span className='popup__error' id='name-error'></span>
      </label>
      <label className='popup__field'>
        <input
          id='description'
          className='popup__input popup__input_type_description'
          name='description'
          placeholder='Acerca de mí'
          minLength={2}
          maxLength={200}
          required
          type='text'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <span className='popup__error' id='description-error'></span>
      </label>
      <button className='button popup__button' type='submit'>
        Guardar
      </button>
    </form>
  );
}
