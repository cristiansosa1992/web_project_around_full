import successIcon from '../../images/success.svg';
import errorIcon from '../../images/errorIcon.svg';

type InfoTooltipProps = {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
  onClose: () => void;
};

function InfoTooltip({
  isOpen,
  isSuccess,
  message,
  onClose,
}: InfoTooltipProps): React.JSX.Element {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className='popup__content info-tooltip'>
        <button
          aria-label='Cerrar ventana'
          className='popup__close'
          onClick={onClose}
          type='button'
        />
        <img
          alt={isSuccess ? 'Registro exitoso' : 'Error'}
          className={`info-tooltip__icon ${
            !isSuccess ? 'info-tooltip__icon_type_error' : ''
          }`}
          src={isSuccess ? successIcon : errorIcon}
        />
        <p className='info-tooltip__message'>{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
