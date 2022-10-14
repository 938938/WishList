import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { dbService, storageService } from '../fbase';
import { BLUE, GREEN, RED, VIOLET, WHITE, YELLOW } from '../global/globalColor';
import { IoMdPaw } from 'react-icons/io';

const Main = ({ userObj }) => {
  const colorBox = [RED, YELLOW, GREEN, BLUE, VIOLET];
  const filterBox = [WHITE, RED, YELLOW, GREEN, BLUE, VIOLET];
  const [siteLink, setSiteLink] = useState('');
  const [text, setText] = useState('');
  const [photoFile, setPhotoFile] = useState('');
  const [choiceColor, setChoiceColor] = useState(RED);
  const [filterColor, setFilterColor] = useState(WHITE);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (siteLink === '' && text === '') return;
    let photoUrl = '';
    if (photoFile !== '') {
      const photoRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(photoRef, photoFile, 'data_url');
      photoUrl = await getDownloadURL(response.ref);
    }
    const itemObj = {
      text,
      createAt: Date.now(),
      creatorId: userObj.uid,
      photoUrl,
      choiceColor,
    };
    await addDoc(collection(dbService, 'wish-item'), itemObj);
    setSiteLink('');
    setText('');
    setPhotoFile('');
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
  const changeFilter = (e) => {
    setFilterColor(e.target.name);
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
          <div
            onClick={clearPhoto}
            style={{ width: 100, height: 100, border: `1px solid black` }}
          >
            {photoFile ? (
              <img
                src={photoFile}
                style={{
                  width: 100,
                  height: 100,
                  border: `1px solid black`,
                  background: WHITE,
                }}
              />
            ) : (
              <IoMdPaw
                style={{
                  width: 100,
                  height: 100,
                  background: WHITE,
                }}
              />
            )}
          </div>
          <input
            id='attach-file'
            type='file'
            accept='image/*'
            onChange={onFileChange}
          />
          <div>
            <input
              value={siteLink}
              placeholder='Link'
              name='link'
              onChange={onChange}
            />
          </div>
          <input
            value={text}
            placeholder='추가 정보'
            name='text'
            onChange={onChange}
          />
          <button>Okay</button>
        </form>
      </div>
      {filterBox.map((color) => {
        return (
          <button
            key={color}
            name={color}
            style={{ width: 30, height: 20, backgroundColor: color }}
            onClick={changeFilter}
          />
        );
      })}
      <div
        style={{
          width: 800,
          height: 1000,
          border: '1px solid black',
          backgroundColor: filterColor,
        }}
      >
        <p>아이템 불러온거</p>
      </div>
    </div>
  );
};

export default Main;
