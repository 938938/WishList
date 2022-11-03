import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { dbService, storageService } from '../fbase';
import { BLUE2, GREEN1, GREEN2, GREEN3, GREEN4 } from '../global/globalColor';
import { IoMdPhotos } from 'react-icons/io';
import styled from 'styled-components';

const ItemCreator = ({ userObj, setModal }) => {
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
    onButton();
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
  const onButton = () => {
    setModal(false);
  };
  return (
    <Modal>
      <CreatorForm onSubmit={onSubmit} bgColor={BLUE2}>
        <PhotoBox color={choiceColor}>
          {photoFile ? (
            <PhotoImg src={photoFile} onClick={clearPhoto} />
          ) : (
            <PhotoLabel htmlFor='attach-file'>
              <IoMdPhotos className='icon' />
            </PhotoLabel>
          )}
        </PhotoBox>
        <BtnBox>
          {colorBox.map((color) => {
            return <ColorBtn bgColor={color} key={color} name={color} onClick={changeColor} />;
          })}
        </BtnBox>
        <PhotoInput id='attach-file' type='file' accept='image/*' onChange={onFileChange} />
        <Input value={siteLink} placeholder='Link' name='link' type='url' onChange={onChange} />
        <Textarea value={text} placeholder='추가 정보' name='text' type='text' onChange={onChange} />
        <BtnBox>
          <FormBtn onClick={onSubmit}>Okay</FormBtn>
          <FormBtn onClick={onButton}>Cancel</FormBtn>
        </BtnBox>
      </CreatorForm>
    </Modal>
  );
};

export default ItemCreator;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000030;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const CreatorForm = styled.form`
  width: 25vw;
  min-width: 400px;
  max-width: 600px;
  height: 60vh;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 460px) {
    width: 90vw;
    min-width: 300px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  /* margin-right: 10px; */
  justify-content: space-between;
`;
const ColorBtn = styled.button`
  width: 20px;
  height: 15px;
  background-color: ${(props) => props.bgColor};
  border-radius: 0;
  margin: 5px;
`;

const PhotoBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 10px;
  border: 3px solid ${(props) => props.color};
  /* @media screen and (max-width: 460px) {
    display: none;
  } */
`;

const PhotoImg = styled.img`
  width: 150px;
  height: 150px;
`;

const PhotoLabel = styled.label`
  cursor: pointer;

  .icon {
    width: 150px;
    height: 150px;
    background-color: white;
    &:hover {
      opacity: 0.5;
    }
  }
`;

// const PhotoLabel2 = styled.label`
//   display: none;
//   @media screen and (max-width: 460px) {
//     display: block;
//     font-size: 5px;
//     cursor: pointer;
//     position: relative;
//     top: -5px;
//     color: ${(props) => props.color};
//     &:hover {
//       opacity: 0.5;
//     }
//   }
// `;

const Input = styled.input`
border:1px solid #00000020;
  @media screen and (max-width: 460px) {
    width: 70vw;
  }
`;

const Textarea = styled.textarea`
  width:20vw;
  min-width:200px;
  height:200px;
  margin:5px;
  padding:10px;
  border:1px solid #00000020;
  border-radius:10px;
  box-sizing: content-box;
  resize: none;
  @media screen and (max-width: 460px) {
    width: 70vw;
    height:150px;
  }
`

const FormBtn = styled.button`
  margin: 5px;
  width: 10vw;
  height: 60px;
  border-radius: 10px;
  border: 0;
  &:hover {
    background-color: lightgray;
    color: white;
  }
  @media screen and (max-width: 460px) {
    width: 30vw;
  }
`;

const PhotoInput = styled.input`
  display: none;
`;
