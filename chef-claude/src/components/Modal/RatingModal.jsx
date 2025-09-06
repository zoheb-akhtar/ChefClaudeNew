import React from 'react'
import ReactDOM from 'react-dom'
import "./modal.css"

export default function RatingModal({setShowModal, clickFunction, message, ctaButtonMessage, rating, setRating}) {
    function onClickFunction() {
        clickFunction();
        setShowModal(false)
    }

  return ReactDOM.createPortal(
    <>
    <div className="modal">
    <div className="child-container rating-child-container">
    <img onClick={() => setShowModal(false)} className="x-button" src="/images/x.svg"></img>
      <p className="modal-title rating-title">{message}</p>
    </div>
    <div className="rating-slider-container">
        <input className="rating-slider" type="range" min="0" max="10" step="0.5" value={rating} onChange={(e) => setRating(e.target.value)}></input>
        <div className="rating-container">
        <p>Your Rating: <span className="rating">{rating}</span></p>
        <img className="star-img" src="/images/star.svg"></img>
        </div>
        
    </div>
    <div className="modal-buttons-container">
      <button onClick={() => setShowModal(false)} className="modal-button modal-cancel">Cancel</button>
      <button onClick={onClickFunction} className="modal-button modal-delete modal-rate">
      {ctaButtonMessage}
        </button>
      </div>
    </div>
    </>, document.getElementById("portal")
    
  )
}
