import { ref } from 'firebase/storage';
import React, { useState } from 'react';
import { storageService } from '../fbase';
import { BLUE, GREEN, RED, VIOLET, WHITE, YELLOW } from '../global/globalColor';

const Main = () => {
  const colorBox = [RED, YELLOW, GREEN, BLUE, VIOLET];
  const [siteLink, setSiteLink] = useState('');
  const [text, setText] = useState('');
  const [photoFile, setPhotoFile] = useState('');
  const [choiceColor, setChoiceColor] = useState(WHITE);

  const onSubmit = (e) => {
    e.preventDefault();
    if (siteLink === '' && text === '') return;
    let photoUrl = ''
    if(photoFile !== ''){
      const photoRef = ref(storageService, ``)
    }
  };
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'link') setSiteLink(value);
    if (name === 'text') setText(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPhotoFile(result);
    };
    reader.readAsDataURL(theFile);
  };
  const clearPhoto = () => {
    setPhotoFile('');
  };
  const changeColor = (e) => {
    setChoiceColor(e.target.name);
  };
  return (
    <div>
      {colorBox.map((color) => {
        return (
          <button
            key={color}
            name={color}
            style={{ width: 30, height: 20, backgroundColor: color }}
            onClick={changeColor}
          />
        );
      })}
      <div
        style={{
          border: `1px solid ${choiceColor}`,
          backgroundColor: `${choiceColor}`,
        }}
      >
        <form onSubmit={onSubmit}>
          <div onClick={clearPhoto}>
            <img
              src={photoFile !== '' ? photoFile : ''}
              style={{
                width: 100,
                height: 100,
                border: '1px solid black',
                background: WHITE,
              }}
            />
          </div>
          <input
            id='attach-file'
            type='file'
            accept='image/*'
            onChange={onFileChange}
          />
          <div>
            <input placeholder='Link' name='link' onChange={onChange} />
          </div>
          <input placeholder='추가 정보' name='text' onChange={onChange} />
          <button>Okay</button>
        </form>
      </div>
    </div>
  );
};

export default Main;
