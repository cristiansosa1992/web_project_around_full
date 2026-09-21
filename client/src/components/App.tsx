import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import type {
  CardData,
  EditAvatarData,
  EditProfileData,
  NewCardData,
  PopupConfig,
  UserData,
} from '../types/types';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';

type InfoTooltipState = {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
};

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(
    () => !localStorage.getItem('jwt')
  );
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);
  const [infoTooltip, setInfoTooltip] = useState<InfoTooltipState>({
    isOpen: false,
    isSuccess: false,
    message: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setEmail(user.email || '');
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem('jwt');
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);

        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isLoggedIn]);

  async function handleRegister(emailValue: string, password: string): Promise<void> {
    try {
      await auth.signup(emailValue, password);
      setInfoTooltip({
        isOpen: true,
        isSuccess: true,
        message: '¡Correcto! Ya estás registrado.',
      });
      navigate('/signin');
    } catch (error) {
      console.error(error);
      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: 'Uy, algo salió mal. Por favor, inténtalo de nuevo.',
      });
    }
  }

  async function handleLogin(emailValue: string, password: string): Promise<void> {
    try {
      const { token } = await auth.signin(emailValue, password);

      localStorage.setItem('jwt', token);
      setEmail(emailValue);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: 'Uy, algo salió mal. Por favor, inténtalo de nuevo.',
      });
    }
  }

  function handleSignOut(): void {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    setCurrentUser(null);
    setCards([]);
    navigate('/signin');
  }

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  function handleCloseInfoTooltip(): void {
    setInfoTooltip({
      isOpen: false,
      isSuccess: false,
      message: '',
    });
  }

  async function handleUpdateUser(data: EditProfileData): Promise<void> {
    try {
      const updatedUser = await api.updateUserInfo(data);

      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(data: EditAvatarData): Promise<void> {
    try {
      const updatedUser = await api.updateAvatar(data);

      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(data: NewCardData): Promise<void> {
    try {
      const newCard = await api.addCard(data);

      setCards((state) => [newCard, ...state]);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardLike(card: CardData): Promise<void> {
    const isLiked = card.isLiked;

    try {
      const apiCall = isLiked ? api.removeLike(card._id) : api.addLike(card._id);
      const newCard = await apiCall;

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card: CardData): Promise<void> {
    try {
      await api.deleteCard(card._id);

      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleAddPlaceSubmit,
        handleUpdateAvatar,
        handleUpdateUser,
      }}
    >
      <div className='page__content'>
        <Header email={email} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />

        {isAuthChecked && (
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    handleCardDelete={handleCardDelete}
                    handleCardLike={handleCardLike}
                    handleClosePopup={handleClosePopup}
                    handleOpenPopup={handleOpenPopup}
                    popup={popup}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path='/signin'
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />

            <Route
              path='/signup'
              element={
                !isLoggedIn ? (
                  <Register onRegister={handleRegister} />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />

            <Route
              path='*'
              element={<Navigate to={isLoggedIn ? '/' : '/signin'} replace />}
            />
          </Routes>
        )}

        <Footer />
        <InfoTooltip
          isOpen={infoTooltip.isOpen}
          isSuccess={infoTooltip.isSuccess}
          message={infoTooltip.message}
          onClose={handleCloseInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
