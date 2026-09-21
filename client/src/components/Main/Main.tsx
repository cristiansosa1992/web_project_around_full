import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Popup from './Popup/Popup';
import type { CardData, PopupConfig } from '../../types/types';
import NewCard from './Popup/NewCard/NewCard';
import EditAvatar from './Popup/EditAvatar/EditAvatar';
import EditProfile from './Popup/EditProfile/EditProfile';
import Card from './Card/Card';

type MainProps = {
  cards: CardData[];
  handleCardDelete: (card: CardData) => void;
  handleCardLike: (card: CardData) => void;
  handleClosePopup: () => void;
  handleOpenPopup: (popup: PopupConfig) => void;
  popup: PopupConfig | null;
};

function Main(props: MainProps): React.JSX.Element {
  const {
    cards,
    handleCardDelete,
    handleCardLike,
    handleClosePopup,
    handleOpenPopup,
    popup,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup: PopupConfig = {
    title: 'Nuevo lugar',
    children: <NewCard />,
  };

  const editAvatarPopup: PopupConfig = {
    title: 'Cambiar foto de perfil',
    children: <EditAvatar />,
  };

  const editProfilePopup: PopupConfig = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  function handleOpenNewCardPopup(): void {
    handleOpenPopup(newCardPopup);
  }

  function handleOpenEditAvatarPopup(): void {
    handleOpenPopup(editAvatarPopup);
  }

  function handleOpenEditProfilePopup(): void {
    handleOpenPopup(editProfilePopup);
  }

  return (
    <main className='content'>
      <section className='profile page__section'>
        <div className='profile__image-container'>
          <img
            className='profile__image'
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />

          <button
            type='button'
            className='profile__image-edit'
            aria-label='Editar avatar'
            onClick={handleOpenEditAvatarPopup}
          />
        </div>

        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser?.name}</h1>

          <button
            aria-label='Editar perfil'
            className='profile__edit-button'
            type='button'
            onClick={handleOpenEditProfilePopup}
          />

          <p className='profile__description'>{currentUser?.about}</p>
        </div>

        <button
          aria-label='Agregar tarjeta'
          className='profile__add-button'
          type='button'
          onClick={handleOpenNewCardPopup}
        />
      </section>

      <section className='cards page__section'>
        <ul className='cards__list'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardDelete={handleCardDelete}
              handleCardLike={handleCardLike}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
