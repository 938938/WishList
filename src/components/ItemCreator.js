import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { dbService, storageService } from '../fbase';
import { BLUE2, GREEN1, GREEN2, GREEN3, GREEN4 } from '../global/globalColor';
import { IoMdPaw } from 'react-icons/io';
import styled from 'styled-components';

const ItemCreator = ({ userObj }) => {
  const colorBox = [GREEN1, GREEN2, GREEN3, GREEN4];
  const [siteLink, setSiteLink] = useState('');
  const [text, setText] = useState('');
  const [photoFile, setPhotoFile] = useState('');
  const [choiceColor, setChoiceColor] = useState(GREEN1);

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
      siteLink,
      text,
      createdAt: Date.now(),
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
  return (
    <>
      <CreatorForm onSubmit={onSubmit} color={choiceColor} bgColor={BLUE2}>
        <BtnBox>
          {colorBox.map((color) => {
            return (
              <ColorBtn
                bgColor={color}
                key={color}
                name={color}
                onClick={changeColor}
              />
            );
          })}
        </BtnBox>
        <PhotoBox>
          {photoFile ? (
            <PhotoImg src={photoFile} onClick={clearPhoto} />
          ) : (
            <PhotoLabel htmlFor='attach-file'>
              <IoMdPaw className='icon' />
            </PhotoLabel>
          )}
        </PhotoBox>
        <PhotoInput
          id='attach-file'
          type='file'
          accept='image/*'
          onChange={onFileChange}
        />
        <div>
          <div>
            <input
              value={siteLink}
              placeholder='Link'
              name='link'
              type='url'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              value={text}
              placeholder='추가 정보'
              name='text'
              type='text'
              onChange={onChange}
            />
          </div>
        </div>
        <SubmitBtn>Okay</SubmitBtn>
      </CreatorForm>
    </>
  );
};

export default ItemCreator;

const CreatorForm = styled.form`
  width: 40vw;
  height: 130px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  border: thick double ${(props) => props.color};
  border-radius: 10px;
  /* background-color: ${(props) => props.bgColor}; */
  background-color: white;
  display: flex;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
const ColorBtn = styled.button`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.bgColor};
  border-radius: 0;
  margin: 5px 0;
`;

const PhotoBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 10px;
`;

const PhotoImg = styled.img`
  width: 100px;
  height: 100px;
`;

const PhotoLabel = styled.label`
  .icon {
    width: 100px;
    height: 100px;
    background-color: white;
  }
`;

const SubmitBtn = styled.button`
  margin: 5px;
  width: 90px;
  height: 90px;
  border-radius: 10px;
  border: 0;
`;

const PhotoInput = styled.input`
  display: none;
`;
