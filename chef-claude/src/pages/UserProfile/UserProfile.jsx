import React, { useEffect, useState } from 'react'
import "./user-profile.css"
import useCurrentUser from '../../hooks/useCurrentUser.jsx'
import api from '../../api/apiInstance';
import toast from 'react-hot-toast';
import logout from '../../utils/logout';
import Modal from "../../components/Modal/Modal"
import { useNavigate } from 'react-router';
import UserProfileInput from '../../components/UserProfile/UserProfileInput/UserProfileInput';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

export default function UserProfile() {
  const [user, error, isLoading] = useCurrentUser();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editFirstName, setEditFirstName] = useState(true);
  const [editLastName, setEditLastName] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [prevFirst, setPrevFirst] = useState("");
  const [prevLast, setPrevLast] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const createdAtRaw = user && user.created_at.split("T")[0];
  const splitData = createdAtRaw && createdAtRaw.split("-");
  const createdAt = splitData && `${splitData[1]}/${splitData[2]}/${splitData[0]}`

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPrevFirst(user.first_name);
      setPrevLast(user.last_name);
      setPrevEmail(user.email);
    }
  }, [user])


  async function deleteAccount() {
    const isDemoAccount = user?.email === "demo@example.com"
    if (isDemoAccount) {
      toast.error("You cannot delete this account because it is a demo account!");
      return;
    }

    try {
      await api.delete("/user/delete_account");
      logout(navigate)
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
    }

  }


  
  if (isLoading) return <Loader />
  if (error) return <ErrorMessage error={error} bgColor="#fbfbf9"/>
  return (
    <div className="user-profile-page-container">
      <div className="user-profile-container">
            <p className="user-profile-header">{prevFirst} {prevLast} - User Profile</p>
            <p className="user-profile-date">Account created on: {createdAt}</p>
            <div className="user-profile-edit-section">

              <UserProfileInput 
              editValue={editFirstName}
              inputLabel="First Name"
              setValue={setFirstName}
              value={firstName}
              setEditValue={setEditFirstName}
              prevValue={prevFirst}
              includeModal={false}
              route="/user/edit_first_name"
              setPrevVal={setPrevFirst}
              />

              <UserProfileInput 
              editValue={editLastName}
              inputLabel="Last Name"
              setValue={setLastName}
              value={lastName}
              setEditValue={setEditLastName}
              prevValue={prevLast}
              includeModal={false}
              route="/user/edit_last_name"
              setPrevVal={setPrevLast}
              />
  
              <UserProfileInput 
              editValue={editEmail}
              inputLabel="Email"
              setValue={setEmail}
              value={email}
              setEditValue={setEditEmail}
              prevValue={prevEmail}
              setShowModal={setShowEmailModal}
              includeModal={true}
              route="/user/edit_email"
              setPrevVal={setPrevEmail}
              showModal={showEmailModal}
              />

            </div>
              
            <div className="user-profile-buttons-container">
              <button className="user-profile-button logout-button" onClick={() => setShowLogoutModal(true)}>Logout</button>
              <button className="user-profile-button delete-account-button" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
            </div>

            {showLogoutModal && <Modal 
            setShowModal={setShowLogoutModal}
            clickFunction={() => logout(navigate)}
            message="Are you sure you want to logout?"
            ctaButtonMessage="Logout"
            />}

            {showDeleteModal && <Modal 
            setShowModal={setShowDeleteModal}
            clickFunction={deleteAccount}
            message="Are you sure you want to delete your account?"
            ctaButtonMessage="Delete Account"
            includeWarning={true}
            />}

            </div>
    </div>
    
  )
}
