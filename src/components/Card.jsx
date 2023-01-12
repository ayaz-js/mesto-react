function Card({card, onCardClick}) {
  return (
    <>
      <article className="element">
        <img alt={card.name}
             src={card.link}
             className="element__image"
             onClick={() => onCardClick(card)}
        />
        <div className="element__text-container">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button type="button" className="element__like-button"></button>
            <span className="element__like-count">{card.likes.length}</span>
          </div>
        </div>
        <button type="button" className="element__remove-button"></button>
      </article>
    </>
  );
}

export default Card;
