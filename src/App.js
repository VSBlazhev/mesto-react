
import Footer from './components/Footer.js';
import Header from './components/Header.js'
import Main from './components/Main.js'
import PopupWithForm from './components/PopupWithForm.js';
import React, { useState } from 'react';
import ImagePopup from './components/ImagePopup.js';


function App() {

  React.useEffect(()=>{document.body.classList.add('page')},[])


  const [isEditProfilePopupOpen, setEditProfileOpen]= React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceOpen]= React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarOpen]= React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  function handleEditAvatarClick(){
    setEditAvatarOpen(true)
    }
    
    function handleEditProfileClick(){
      setEditProfileOpen(true)
    }
    
    function handleAddPlaceClick(){
      setAddPlaceOpen(true)
    }

    function closeAllPoups(){
      setEditAvatarOpen(false)
      setEditProfileOpen(false)
      setAddPlaceOpen(false)
      setSelectedCard({})
    }

    function handleCardClick(card){
      setSelectedCard({name: card.name, link:card.link})
    }

  return (
    <>
    
    <div className="page__container">
    <Header/>
    <Main
    onEditProfile ={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    
    />
        <Footer/>
        <PopupWithForm 
        name="_edit-pic"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPoups}
        children={
          <>
          <label className="popup__label">
    <input
    required
    id="pic-input"
    name="pic"
    className="popup__pic-edit-input popup__info-form-input"
    type="url"
    placeholder="Ссылка на картинку"
    />
    <span className="popup__error pic-input-error"></span>
  </label>
          </>
        }
        
        
        
        />


<PopupWithForm 
name='_confirmation'
title='Вы уверены'
buttonText="да"
onClose={closeAllPoups}
/>


<PopupWithForm
name="_edit-form"
title='Редактировать профиль'
buttonText='Сохранить'
isOpen={isEditProfilePopupOpen}
onClose={closeAllPoups}
children={
  <>
            <label className="popup__label">
              <input
                required
                id="name-input"
                name="name"
                className="popup__info-form-input popup__info-form-input_type_name"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
              />

              <span className="popup__error name-input-error"></span>
            </label>
            <label className="popup__label">
              <input
                required
                id="info-input"
                name="description"
                className="popup__info-form-input popup__info-form-input_type_info"
                type="text"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
              />

              <span className="popup__error info-input-error"></span>
            </label>

  </>
}
/>


<PopupWithForm
name='_add-place'
title='Новое место'
buttonText="Создать"
isOpen={isAddPlacePopupOpen}
onClose={closeAllPoups}
children={
  <>
  <label className="popup__label">
              <input
                required
                id="place-input"
                name="place_name"
                className="popup__info-form-input popup__info-form-input_type_place-name"
                type="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
              />
              <span className="popup__error place-input-error"></span>
            </label>
            <label className="popup__label">
              <input
                required
                id="link-input"
                name="place_link"
                className="popup__info-form-input popup__info-form-input_type_place-link"
                type="url"
                placeholder="Ссылка на картинку"
              />
              <span className="popup__error link-input-error"></span>
            </label>
  </>
}
/>
<ImagePopup 
card= {selectedCard}

onClose={closeAllPoups}
/>

    </div>
  
  </>
  );
}

export default App;
