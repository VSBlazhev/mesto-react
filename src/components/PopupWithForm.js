function PopupWithForm(props) {
 const {title, name, children, buttonText, isOpen, onClose} = props


 return (
    <div className={`popup popup_content-type${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
    <form
    name={`${props.name}`}
    className="popup__form popup__info-form "
    noValidate>
    <h2 className="popup__heading">{props.title}</h2>
    {props.children}

{/*     <label className="popup__label">
    <input
    required
    id="pic-input"
    name="pic"
    className="popup__pic-edit-input popup__info-form-input"
    type="url"
    placeholder="Ссылка на картинку"
    />
    <span className="popup__error pic-input-error"></span>
  </label>*/}

    <button className="popup__button" type="submit">{props.buttonText}</button> 
  </form>
    <button className="popup__close-button" type="button" onClick={onClose}></button>
    </div>
 </div>
 )
}

export default PopupWithForm