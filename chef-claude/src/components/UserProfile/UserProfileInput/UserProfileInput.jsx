import React from 'react'
import toast from 'react-hot-toast';
import Modal from '../../Modal/Modal';
import api from '../../../api/apiInstance';
import "./user-profile-input.css"

export default function UserProfileInput({editValue, inputLabel, setValue, value, setEditValue, prevValue, setShowModal, includeModal, route, setPrevVal, showModal}) {
    function showModalFunc() {
        if (value === prevValue) {
            setEditValue(true);
            return;
          }
          setShowModal(true)
    }

    async function changeValue() {
        if (value === prevValue) {
          setEditValue(true);
          return;
        };
    
        try {
          await api.patch(route, {
            value: value
          })
          setEditValue(true);
          setPrevVal(value);
          toast.success(`${inputLabel} updated successfully!`);
        } catch (error) {
          toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
        }
      }

  return (
    <div className="user-profile-edit-container">
        <p className={`edit-input-label ${editValue ? "" : "edit-input-label-editable"}`}>{inputLabel}</p>
        <div className="edit-input-container">
        <input onChange={(e) => setValue(e.target.value)} className={`edit-input ${editValue ? "" : "edit-input-editable"}`} readOnly={editValue} value={value}></input>
        <img onClick={editValue ? () => setEditValue(prevEdit => !prevEdit) : (includeModal ? showModalFunc : changeValue)} className="edit-img" src={editValue ? "/images/edit-2.svg" : "/images/check-circle.svg"}></img>
        </div>

        {showModal && value != prevValue ? <Modal 
              setShowModal={setShowModal}
              clickFunction={changeValue}
              message={`Are you sure you want to change your ${inputLabel} to ${value}?`}
              ctaButtonMessage="Edit"
              cancelEdit={true}
              setEdit={setEditValue}
              setValue={setValue}
              prevValue={prevValue}
              /> : null}
    </div>



  )
}
