import React from "react";

 function Card(props){
const {card,handleCardClick} = props

return (
    <div className="card"  >
   {/*  <button className="card__fullscreen-button" }> */}
      <img src={props.card.link} alt="" className="card__image" /* style={{ backgroundImage: `url(${props.card.link})` }}  */onClick={handleClick}/>
      <button className="card__delete-button" type="button" ></button>
    {/* </button> */}
    <div className="card__info-container" >
      <h2 className="card__text">{props.card.name}</h2>
      <div className="card__like-container">
      <button className="card__like-button" type="button"></button>
      <span className="card__likes">{props.card.likes.length}</span>
    </div>
    </div>
  </div>
)


function handleClick(){
    props.handleCardClick(props.card)
}

}

export default Card