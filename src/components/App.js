import { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Api from "../utils/api.js";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState();

  const closeAllPopups = useCallback(() => {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
  }, []);

  useEffect(() => {
    Api.getUserInfo()
      .then((info) => setCurrentUser(info))
      .catch((error) => console.log(error))
  }, []);

  useEffect(() => {
    Api.getInitialCards()
      .then((initialCards) => setCards(initialCards))
      .catch((error) => console.log(error))
  }, []);

  const handleUpdateUser = (data) => {
    setIsLoading(true)
    Api.editProfile(data)
      .then((info) => setCurrentUser(info))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleUpdateAvatar = (data) => {
    setIsLoading(true)
    Api.editAvatar(data)
      .then((info) => setCurrentUser(info))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true)
    Api.addNewCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (!isLiked) {
      Api.addCardLike(card._id)
        .then((like) => setCards((state) => state.map((c) => c._id === card._id ? like : c)))
        .catch((error) => console.log(error))
    } else {
      Api.deleteCardLike(card._id)
        .then((like) => setCards((state) => state.map((c) => c._id === card._id ? like : c)))
        .catch((error) => console.log(error))
    }
  };

  const handleCardDelete = (card) => {
    setIsLoading(true)
    Api.deleteCard(card._id)
      .then(() => setCards(cards.filter((item) => item !== card)))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleDeleteClick = (card) => {
    setDeletePopupOpen(true);
    setDeletedCard(card)
  }

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onCardClick={(card) => setSelectedCard(card)}
        onEditProfile={() => setEditProfilePopupOpen(true)}
        onAddPlace={() => setAddPlacePopupOpen(true)}
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteClick}
        cards={cards}
      />

      <Footer/>

      <EditProfilePopup
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ConfirmationPopup
        isLoading={isLoading}
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        deleteCard={handleCardDelete}
        card={deletedCard}
      />

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
