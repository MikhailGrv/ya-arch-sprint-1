import React, { lazy, Suspense, useState, useEffect }  from "react";
import api from "../utils/api";

const EditProfilePopup = lazy(() => import('./EditProfilePopup.js').then((res)=>{
  console.log('./EditProfilePopup.js ok');
  return res;
}).catch((ex) => {
  console.log('./EditProfilePopup.js fail', ex);
  return { default: () => <div className='error'>Component EditProfilePopup is not available!</div> };
}));
const EditAvatarPopup = lazy(() => import('./EditAvatarPopup.js').then((res)=>{
  console.log('./EditAvatarPopup.js ok');
  return res;
}).catch((ex) => {
  console.log('./EditAvatarPopup.js fail', ex);
  return { default: () => <div className='error'>Component EditAvatarPopup is not available!</div> };
}));




export default function Profile() {
  //const [curUser, setCurrentUser] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('mount1 app jwt',token);
    api._token = token;
    api
          
      .getAppInfo()
      .then(([userData]) => {
        setCurrentUser(userData.data);
        console.log('Profile app userData', userData);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log('Profile currentUser', currentUser);
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  //setCurrentUser(currentUser);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
  React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
  React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('Profile mount app jwt',token);
    api._token = token;
  });
  function handleUpdateUser(userUpdate) {
    console.log('Profile setCurrentUser',setCurrentUser);
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    console.log('isEditProfilePopupOpen', isEditProfilePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }


  function closeAllPopups (){
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }


  return (
    <div>
      <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        
      </section>
     <Suspense>
     <EditProfilePopup
       currentUser = {currentUser}
       isOpen={isEditProfilePopupOpen}
       onUpdateUser={handleUpdateUser}
       onClose={closeAllPopups}
     />
       <EditAvatarPopup
        currentUser = {currentUser}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
   </Suspense>
   </div>
  );
}

