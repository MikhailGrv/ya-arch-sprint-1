import React, { lazy, Suspense, useState, useEffect }  from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Profile = lazy(() => import('fe_users/Profile').then((res)=>{
  console.log('fe_users/EditProfilePopup ok');
  return res;
}).catch((ex) => {
  console.log('fe_users/Profile fail', ex);
  return { default: () => <div className='error'>Component Profile is not available!</div> };
}));



function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete,closeAllPopups ,setCurrentUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log('Main currentUser', currentUser);
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  // console.log('Main',cards,onEditProfile,onAddPlace,onEditAvatar,onCardClick,onCardLike,onCardDelete);
  // console.log('Main',cards.data, currentUser);
  // console.log('Main user', currentUser);
  // if(cards)
  //     cards.map((card) => {console.log('main card',card); });


  return (
    <main className="content">
      <section className="profile page__section">
        <Suspense>
      <Profile
      currentUser = {currentUser}
        onEditProfile = {onEditProfile}
        onAddPlace = {onAddPlace}
        onEditAvatar = {onEditAvatar}
        closeAllPopups={closeAllPopups}
        setCurrentUser = {setCurrentUser}
      />
      </Suspense>
      
      </section>
      <section className="places page__section">
        <ul className="places__list">
          {
              cards.map((card) => (
            
            <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            
            />
          ))
        }
        </ul>
      </section>
    </main>
  );
}

export default Main;
