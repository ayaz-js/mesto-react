import Popup from './Popup';

function PopupWithForm({title, name, children, isOpen, onClose}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>

      <form className="form" name={name} noValidate>

        {children}

        <button type="submit" disabled className="form__save-button">Сохранить</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
