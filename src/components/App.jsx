import { useState, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";

function App() {
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [isCardData, setIsCardData] = useState({})

  const closeAllPopups = useCallback(() => setSelectedCard(null), []);

  return (
    <div className="wrapper">
      <Header />
      <Main
        onCardClick={(card) => {
          setSelectedCard(true)
          setIsCardData(card)
        }}
      />
      <Footer/>

      <ImagePopup isOpen={isSelectedCard} onClose={closeAllPopups} card={isCardData} />

    </div>
  );
}

export default App;
