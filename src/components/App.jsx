import { useState, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./popups/ImagePopup";
import PopupWithForm from "./popups/PopupWithForm";

function App() {
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [isCardData, setIsCardData] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const closeAllPopups = useCallback(() => {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Main
        onCardClick={(card) => {
          setSelectedCard(true);
          setIsCardData(card);
        }}
        onEditProfile={() => setEditProfilePopupOpen(true)}
        onAddPlace={() => setAddPlacePopupOpen(true)}
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
      />
      <Footer/>

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
      >
        <label className="form__field">
          <input name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" id="name-input"
                 className="form__input form__input_type_name" required />
          <span className="name-input-error form__input-error"></span>
        </label>

        <label className="form__field">
          <input name="about" type="text" placeholder="Деятельность" minLength="2" maxLength="200" id="role-input"
                 className="form__input form__input_type_role" required />
          <span className="role-input-error form__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
      >
        <label className="form__field">
          <input name="name" type="text" placeholder="Название" minLength="2" maxLength="30" id="title-input"
                 className="form__input form__input_type_title" required />
            <span className="title-input-error form__input-error"></span>
        </label>

        <label className="form__field">
          <input name="link" type="url" placeholder="Ссылка на картинку" id="link-input"
                 className="form__input form__input_type_url" required />
            <span className="link-input-error form__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
      >
        <label className="form__field">
          <input name="link" type="url" placeholder="Ссылка на аватар" id="avatar__link-input"
                 className="form__input form__input_type_url" required />
            <span className="avatar__link-input-error form__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
        isOpen={isDeletePopupOpen}
      >
        <label className="form__field">
          <input name="link" type="url" placeholder="Ссылка на аватар" id="avatar__link-input"
                 className="form__input form__input_type_url" required />
          <span className="avatar__link-input-error form__input-error"></span>
        </label>
      </PopupWithForm>

      <ImagePopup isOpen={isSelectedCard} onClose={closeAllPopups} card={isCardData} />

    </div>
  );
}

export default App;
