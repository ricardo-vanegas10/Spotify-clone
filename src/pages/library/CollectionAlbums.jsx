import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { NoAlbumImg } from '../../assets/svg';
import { CardFullSection, PageHeader, Loading } from '../../components';

import { TokenContext } from '../../utils/context';
import { useResponseFormater } from '../../utils';

import './styles/Collection.styles.css';

export const CollectionAlbums = () => {
  const { accessToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [userAlbums, setUserAlbums] = useState({});

  useEffect(() => {
    if (accessToken)
      axios
        .get('https://api.spotify.com/v1/me/albums', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then((e) => {
          setUserAlbums(
            e.data.items
              .map((e) => e.album)
              .map((item) => useResponseFormater(item)),
          );
          setLoading(false);
        });
  }, [accessToken]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageHeader bgColor="rgb(18, 18, 18)" disabled={true} />
          <div className="collection">
            {userAlbums.length ? (
              <CardFullSection title="Albums" type="albums" data={userAlbums} />
            ) : (
              <div className="no_info">
                <div className="no_info__img">
                  <NoAlbumImg />
                </div>
                <div className="no_info__description">
                  <h2>Sigue tu primer álbum</h2>
                  <span>Para guardar un álbum, haga clic en el ícono.</span>
                </div>
                <div className="no_info__button">
                  <Link to={'/search'}>Buscar Albumnes</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
