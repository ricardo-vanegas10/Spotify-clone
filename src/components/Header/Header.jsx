import React from 'react';
import './Header.styles.css';
import { Button, UserMenu } from '../index';
import {
  ArrowLeftImg,
  ArrowRigthImg,
  LogoSmallImg,
} from '../../assets/svg/index';
import {
  useLocation,
  useNavigate,
  useSearchParams,
  NavLink,
} from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

const provider = new FacebookAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

export const Header = ({ login }) => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateTo = (index) => {
    if (location.pathname == '/' && index == -1) return;
    navigate(index);
  };
  const handleSearch = (q) => {
    setSearchParams(q && { q });
  };
  return (
    <header>
      <div className="header__wrapper">
        <Button
          type="icon"
          src={<ArrowLeftImg />}
          onClick={() => {
            navigateTo(-1);
          }}
        />
        <Button
          type="icon"
          src={<ArrowRigthImg />}
          onClick={() => {
            navigateTo(+1);
          }}
        />
        {location.pathname == '/search' && (
          <SearchBar onChange={handleSearch} />
        )}

        {(location.pathname == '/collection/albums' ||
          location.pathname == '/collection/playlists' ||
          location.pathname == '/collection/artists') && (
          <div className="collection__nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'collection__nav--active' : ''
              }
              to="/collection/playlists"
            >
              <span>Playlists</span>{' '}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'collection__nav--active' : ''
              }
              to="/collection/artists"
            >
              <span>Artists</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'collection__nav--active' : ''
              }
              to="/collection/albums"
            >
              <span>Albums</span>
            </NavLink>
          </div>
        )}
      </div>
      <div className="header__wrapper">
        {location.pathname == '/login' ? (
          <button
            className="login__button flex items-center h-fit w-full px-[8px] py-[5px] rounded-full text-black bg-white"
            onClick={() => login()}
          >
            <div className="button__icon">
              <LogoSmallImg />
            </div>
            Login
          </button>
        ) : (
          <UserMenu />
        )}
      </div>
    </header>
  );
};
