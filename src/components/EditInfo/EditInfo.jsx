import React, { useContext, useEffect, useState } from 'react';
import { Modal, Cover } from '..';
import { AttentionImg } from '../../assets/svg';
import { TokenContext } from '../../utils/context';
import './EditInfo.styles.css';
import axios from 'axios';

export const EditInfo = ({ isOpen, setIsOpen, data }) => {
  const { color, title, name, cover, type, owner, total_tracks } = data;
  const { accessToken } = useContext(TokenContext);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [imgInput, setImgInput] = useState('');
  const [base64, setBase64] = useState('');
  const [alert, setAlert] = useState('');

  const alertLevel = ['#e9a414', '#e91429'];

  const alertmessages = {
    imageSizeErr: ['La imagen no puede tener más de 256 KB.', 0],
    imageUndefinedErr: ['Por favor seleccione uma imagen válida', 0],
    titleErr: ['El nombre de la playlist es obligatorio', 1],
  };

  useEffect(() => {
    if (!isOpen) {
      setTitleInput(data.name);
      setDescriptionInput(data.description);
      setImgInput(data.cover && data.cover[0].url);
      setAlert('');
      console.log(isOpen);
    }
  }, [isOpen, data]);

  function handleReaderLoaded(readerEvent) {
    let binaryString = readerEvent.target.result;
    setBase64(btoa(binaryString));
  }

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (validateFile(file)) {
      file.preview = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
      setImgInput(file.preview);
      setAlert('');
    }
  };

  const handleSaveChange = () => {
    const option = {
      name: titleInput,
    };

    const option_description = {
      name: titleInput,
      description: descriptionInput,
    };
    Promise.all([
      base64 &&
        axios(`https://api.spotify.com/v1/playlists/${data.id}/images`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'image/jpeg',
          },
          method: 'PUT',
          data: base64,
        }),
      axios(`https://api.spotify.com/v1/playlists/${data.id}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        method: 'PUT',
        data: descriptionInput ? option_description : option,
      }),
    ]).then(() => {
      console.log('Hecho');
      window.location.reload();
    });
  };

  useEffect(() => {
    if (!titleInput) setAlert(alertmessages.titleErr);
    else setAlert('');
  }, [titleInput]);

  function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (typeof file !== 'undefined' && validTypes.indexOf(file.type) === -1) {
      console.log('Por favor, suba una imagen');
      setAlert(alertmessages.imageUndefinedErr);
      return false;
    }

    if (typeof file !== 'undefined' && file.size > 1024 * 256) {
      console.log('La imagen no puede tener más de 256 KB.');
      setAlert(alertmessages.imageSizeErr);
      return false;
    }
    return true;
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="edit__info flex flex-col h-full w-[524px] gap-[1rem]">
        <p
          style={{ backgroundColor: alertLevel[alert[1]] }}
          className={`edit__alert ${alert && 'edit__alert--open'}`}
        >
          <AttentionImg /> {alert[0]}
        </p>
        <div className="edit__main flex w-full gap-[1rem]">
          <div className="edit__input__img">
            <Cover src={imgInput} editable>
              <input
                type="file"
                accept="image/.jpg, image/.jpeg, image/.png"
                onChange={(e) => handleFileChange(e)}
                value=""
              />
            </Cover>
          </div>
          <div className="edit__inputs">
            <div
              className={`input__title ${
                !titleInput && 'input__title--invalid'
              }`}
            >
              <input
                type="text"
                placeholder="Agrega un nombre"
                onChange={(e) => setTitleInput(e.target.value)}
                value={titleInput}
              />
              <label>name</label>
            </div>
            <div className="input__description">
              <textarea
                type="text"
                placeholder="Agrega una descripción opcional"
                onChange={(e) => setDescriptionInput(e.target.value)}
                value={descriptionInput}
              />
              <label>description</label>
            </div>
          </div>
        </div>
        <div className="edit__footer">
          <button
            disabled={alert && true}
            onClick={() => {
              handleSaveChange();
            }}
            className={`edit__save__button ${
              alert && 'edit__save__button--disabled'
            }`}
          >
            Salvar
          </button>
          <p>
            Al continuar, autorizas a Spotify a acceder a la imagen cargada.
            Asegúrate de tener los derechos para cargar esta imagen.
          </p>
        </div>
      </div>
    </Modal>
  );
};
