import React from 'react'
import ReactDOM from 'react-dom'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import "./modal.css"

export default function Modal({setShowModal, clickFunction, message, ctaButtonMessage, cancelEdit, setEdit, setValue, prevValue, includeWarning}) {

function onClickFunction() {
    clickFunction();
    setShowModal(false);
}

function cancel() {
  setShowModal(false);
  setEdit(true);
  setValue(prevValue)
}

  return ReactDOM.createPortal(
    <>
    <div className="modal">
    <div className="child-container">
    <img onClick={cancelEdit ? cancel : () => setShowModal(false)} className="x-button" src="/images/x.svg"></img>
      <p className="modal-title">{message}</p>
    </div>
    {includeWarning && <ErrorMessage error="Warning: This action cannot be undone!" bgColor="white" />}
    <div className="modal-buttons-container">
      <button onClick={cancelEdit ? cancel : () => setShowModal(false)} className="modal-button modal-cancel">Cancel</button>
      <button onClick={onClickFunction} className={`modal-button modal-delete ${cancelEdit && "modal-edit"}`}>
      {ctaButtonMessage}
        </button>
      </div>
    </div>
    </>, document.getElementById("portal")
    
  )
}
