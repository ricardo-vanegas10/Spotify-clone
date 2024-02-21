import React, { useContext, useEffect, useRef, useState } from 'react';
import { useComponentVisible } from '../../utils/useOutsideClick';
import './UserMenu.styles.css';
import {
  ArrowDownMenuImg,
  ArrowUpMenuImg,
  UseDefaultImg,
} from '../../assets/svg/index';
import { TokenContext, UserContext } from '../../utils/context';
import axios from 'axios';
import { setCookie } from '../../utils/useCookie';

export const UserMenu = () => {
  const { accessToken } = useContext(TokenContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { ref1, ref2, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((e) => {
        setCurrentUser(e.data);
        setIsLoading(false);
      });
  }, [accessToken]);

  const handleLeave = () => {
    setCookie('refresh_token', '', 0);
    window.location.reload();
  };

  return (
    <>
      {!isLoading && (
        <div ref={ref1} className="user__menu">
          <button
            className="user__menu__btn h-fit w-[100%] max max-w-[180px] hidden md:flex items-center gap-[8px] px-[2px] rounded-full box-border text-white cursor-pointer border-none relative"
            onClick={() => {
              setIsComponentVisible(!isComponentVisible);
            }}
          >
            <div className="user__picture">
              {currentUser.images.length ? (
                <img
                  aria-hidden="false"
                  draggable="false"
                  loading="eager"
                  src={currentUser.images[0]}
                  alt={currentUser.display_name}
                />
              ) : (
                <div className="user--default">
                  <UseDefaultImg />
                </div>
              )}
            </div>
            <div className="user__name">
              <span>{currentUser.display_name}</span>
            </div>
            <div className="user__icon">
              {isComponentVisible ? <ArrowUpMenuImg /> : <ArrowDownMenuImg />}
            </div>
          </button>
          <div
            className={`user__menu__options ${
              isComponentVisible ? 'user--open' : ''
            }`}
          >
            <ul className="menu__list">
              <li>
                <button onClick={() => handleLeave()}>
                  <span>Salir</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
