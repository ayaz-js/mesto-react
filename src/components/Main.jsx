import { useEffect, useState } from "react";
import Card from "./Card";
import Api from "../utils/Api";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      }).catch((error) => console.log(error));
  }, []);

  return (
    <>
      <main className="content">

        <section className="profile">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img
              src={userAvatar}
              alt="Аватар пользователя"
              className="profile__avatar-image"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            <p className="profile__role">{userDescription}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
            />
          ))}
        </section>

      </main>
    </>
  );
}

export default Main;
