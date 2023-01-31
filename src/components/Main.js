import api from "../utils/Api.js";
import React, { useState } from "react";
import Card from "./Card";

function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;

  const [userName, setUserName] = React.useState("");
  const [userDescription, setDescription] = React.useState("");
  const [userAvatar, setAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserId(), api.getInitialCards()])
      .then(([data, initCards]) => {
        setUserName(data.name);
        setDescription(data.about);
        setAvatar(data.avatar);
        setCards(initCards);
        console.log(cards);
        console.log(initCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info-container">
          <div className="profile__pic-container">
            <button
              className="profile__pic-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <img
              className="profile__pic"
              src={userAvatar}
              alt="Фотография профиля"
            />
          </div>
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__info">{userDescription}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onEditAvatar}
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            handleCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
