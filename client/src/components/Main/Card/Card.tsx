import { useContext } from 'react';
import ImagePopup from '../Popup/ImagePopup/ImagePopup.tsx';
import CurrentUserContext from '../../../contexts/CurrentUserContext.tsx';
import type { CardData, PopupConfig } from '../../../types/types.ts';

type CardProps = {
  card: CardData;
  handleCardDelete: (card: CardData) => void;
  handleCardLike: (card: CardData) => void;
  handleOpenPopup: (popup: PopupConfig) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
  const { card, handleCardDelete, handleCardLike, handleOpenPopup } = props;
  const { name, link } = card;
  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = currentUser?._id === card.owner;

  const cardLikeButtonClassName = `card__like-button ${
    card.isLiked ? 'card__like-button_is-active' : ''
  }`;

  const imageComponent: PopupConfig = {
    children: <ImagePopup card={card} />,
  };

  return (
    <li className='card'>
      <img
        className='card__image'
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />
      {isOwner && (
        <button
          aria-label='Delete card'
          className='card__delete-button'
          type='button'
          onClick={() => handleCardDelete(card)}
        />
      )}
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <button
          aria-label='Like card'
          type='button'
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(card)}
        />
      </div>
    </li>
  );
}
