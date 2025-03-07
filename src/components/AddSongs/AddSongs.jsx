import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SearchBar } from '../SearchBar/SearchBar';
import { TrackList } from '../TrackList/TrackList';
import './AddSongs.styles.css';
import { TokenContext } from '../../utils/context';
import { useNavigate } from 'react-router-dom';

export const AddSongs = ({ id, data }) => {
  const { accessToken } = useContext(TokenContext);
  const [inputValue, setInputValue] = useState('');
  const [trackList, setTrackList] = useState({ type: 'search', tracks: [] });
  const Navigate = useNavigate(null);
  const handleSearch = (value) => {
    setInputValue(value);
  };
  useEffect(() => {
    if (accessToken && inputValue) {
      axios
        .get('https://api.spotify.com/v1/search?type=track&q=' + inputValue, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then((e) => {
          const { tracks } = e.data;
          setTrackList({
            id: id,
            type: 'search--playlist',
            tracks: tracks.items.filter((element) => {
              return !data.tracks.find((e) => {
                return element.id == e.id;
              });
            }),
          });
        });
    } else {
      setTrackList({ type: 'search', tracks: [] });
    }
  }, [accessToken, inputValue]);
  return (
    <div className="add__song pt-[10px] mx-[24px] border-t-[282828]">
      <div className="add__song__header">
        <h2>Añadir más su playlist</h2>
      </div>
      <div className="add__song__main flex flex-col gap-[24px] p-[0]">
        <SearchBar
          onChange={handleSearch}
          custom="add__song__input rounded-[4px]"
          theme="black"
        />
        {trackList.tracks && <TrackList data={trackList} />}
      </div>
    </div>
  );
};
