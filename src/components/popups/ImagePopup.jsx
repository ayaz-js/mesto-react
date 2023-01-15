import Popup from "./Popup";

function ImagePopup({ isOpen, onClose, card }) {

  return (
    <Popup className="popup_theme_dark"
           name="image"
           isOpen={isOpen}
           onClose={onClose}>
        <img
          src={card.link}
          alt={card.name}
          className="popup__image"
        />
        <p className="popup__image-caption">{card.name}</p>
    </Popup>
  );
}

export default ImagePopup;
