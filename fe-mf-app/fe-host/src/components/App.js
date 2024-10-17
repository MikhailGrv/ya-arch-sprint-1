import React, { lazy, Suspense, useState, useEffect }  from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
//import PopupWithForm from "./PopupWithForm";
//import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//import EditProfilePopup from "./EditProfilePopup";
//import EditAvatarPopup from "./EditAvatarPopup";
//import AddPlacePopup from "./AddPlacePopup";
//import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";




const Register = lazy(() => import('fe_users/Register').then((res)=>{
  console.log('fe_users/Register ok');
  return res;
}).catch((ex) => {
  console.log('fe_users/Register fail', ex);
  return { default: () => <div className='error'>Component Register is not available!</div> };
}));

function App() {



  
 
  


  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('mount1 app jwt',token);
    api._token = token;
    api
          
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData.data);
       // setCards(cardData.data);
        console.log('app setCards', cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('mount2 app jwt',token);
    api._token = token;
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);





  function closeAllPopups() {
    // setIsEditProfilePopupOpen(false);
    // setIsAddPlacePopupOpen(false);
    // setIsEditAvatarPopupOpen(false);
    // setIsInfoToolTipOpen(false);
    // setSelectedCard(null);
  }


 
  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }
  function onSetCurrentUser(data)
  {
    setCurrentUser(data);
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            
            closeAllPopups={closeAllPopups}
            loggedIn={isLoggedIn}
            setCurrentUser={onSetCurrentUser}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
        
       
        
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
