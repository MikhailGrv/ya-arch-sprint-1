import React, { lazy, Suspense, useState, useEffect }  from "react";
import Card from './Card';
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
   
export default function Cards({ currentUser}) {
 
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('mount1 app jwt',token);
    api._token = token;
    api
          
      .getAppInfo()
      .then(([cardData]) => {
        setCards(cardData.data);
        console.log('app setCards', cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('Cards mount app jwt',token);
    api._token = token;
  });

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups (){
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
   <section className="places page__section">
   <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
        <ul className="places__list">
          {
              cards.map((card) => (
                <Suspense>
            <Card
               currentUser = {currentUser}
                       card={card}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            
            />
            </Suspense>
          ))
        }
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
      </div>
  );
}