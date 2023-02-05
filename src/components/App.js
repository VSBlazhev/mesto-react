import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import React, { useState } from "react";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  React.useEffect(() => {
    document.body.classList.add("page");
    api.getUserId().then((data) => {
      setCurrentUser(data);
    });

    api.getInitialCards().then((data) => {
      setCards(data);
    });
  }, []);

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function closeAllPoups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleUpdateUser(inputs) {
    console.log(inputs);
    api
      .patchUserInfo({ name: inputs.name, description: inputs.about })
      .then((data) =>
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        })
      );
    closeAllPoups();
  }

  function handleUpdateAvatar(input) {
    api
      .patchUserAvatar({ link: input.avatar })
      .then((data) =>
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        })
      );
    closeAllPoups();
  }

  function handleAddCard(inputs) {
    console.log(inputs);
    api
      .addNewCard({ name: inputs.name, link: inputs.link })
      .then((newCard) => setCards([newCard, ...cards]));
    closeAllPoups();
  }

  /* function handleCardDelete(card){
  api.deleteCard(card._id)
  .then(((newCard)=>{
    setCards((state)=> state.filter((c) => c._id === card._id ? newCard : c))
  }))
} */

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((c) => c._id != card._id));
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPoups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPoups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPoups}
          onAddCard={handleAddCard}
        />
        <PopupWithForm
          name="_confirmation"
          title="Вы уверены"
          buttonText="да"
          onClose={closeAllPoups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPoups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
