import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { NoArtistImg } from '../../assets/svg';
import { CardFullSection, PageHeader, Loading } from '../../components';

import { TokenContext } from '../../utils/context';
import { useResponseFormater } from '../../utils';

import './styles/Collection.styles.css';

export const CollectionArtists = () => {
  const { accessToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [userArtists, setUserArtists] = useState();

  useEffect(() => {
    if (accessToken)
      axios
        .get('https://api.spotify.com/v1/me/following?type=artist', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then((e) => {
          setUserArtists(
            e.data.artists.items.map((item) => useResponseFormater(item)),
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
            {userArtists.length > 0 ? (
              <CardFullSection title="Artists" data={userArtists} />
            ) : (
              <div className="no_info">
                <div className="no_info__img">
                  <NoArtistImg />
                </div>
                <div className="no_info__description">
                  <h2>Sigue a tu artista</h2>
                  <span>
                    Para seguir a los artistas que te gustan, simplemente haz
                    clic en el botón.
                  </span>
                </div>
                <div className="no_info__button">
                  <Link to={'/search'}>Buscar Artistas</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
