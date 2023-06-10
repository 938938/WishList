import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../../fbase';
import Card from '../../UI/Card';
import { AiOutlineLink, AiOutlineStar } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsQuestionCircle } from 'react-icons/bs';

const Item = ({ itemObj }) => {
  const [modal, setModal] = useState(false);
  const onDelete = async () => {
    const ok = window.confirm('해당 아이템을 삭제하시겠습니까?');
    if (ok) {
      try {
        await deleteDoc(doc(dbService, 'wish-item', `${itemObj.id}`));
        if (itemObj.photoUrl !== '') {
          await deleteObject(ref(storageService, itemObj.photoUrl));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onModal = () => {
    setModal((modal) => !modal);
  };
  return (
    <Card>
      <ImgBox color={itemObj.choiceColor}>
        {itemObj.photoUrl ? (
          <ImgItem src={itemObj.photoUrl} onClick={onModal} />
        ) : (
          <IconBox>
            <AiOutlineStar className='icon' />
          </IconBox>
        )}
      </ImgBox>
      {/* <div><a ref={itemObj.siteLink} /></div> */}
      <TextBox>
        <div>
          {itemObj.siteLink ? (
            <ItemBtn
              onClick={() =>
                window.open(
                  itemObj.siteLink.startsWith('http')
                    ? `${itemObj.siteLink}`
                    : `https://${itemObj.siteLink}`,
                  '_blank'
                )
              }
            >
              <AiOutlineLink className='icon' />
            </ItemBtn>
          ) : (
            <ItemBtn>
              <BsQuestionCircle />
            </ItemBtn>
          )}
          <ItemBtn onClick={onDelete}>
            <RiDeleteBin5Line className='icon' />
          </ItemBtn>
        </div>
        <Text>{itemObj.text}</Text>
      </TextBox>
      {modal ? (
        <>
          <Modal src={itemObj.photoUrl} onClick={onModal} />
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Item;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
  border: 3px solid ${(props) => props.color};
  box-sizing: border-box;
`;

const ImgItem = styled.img`
  border: 0;
  cursor: pointer;
  width: 100px;
  height: 100px;
  background-color: white;
`;

const IconBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  padding: 23px;
  box-sizing: border-box;
  .icon {
    width: 50px;
    height: 50px;
  }
`;

const TextBox = styled.div`
  margin-left: 10px;
`;

const ItemBtn = styled.button`
  width: 15px;
  height: 15px;
  background-color: transparent;
  margin: 0 5px;
  .icon {
    width: 15px;
    height: 15px;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Text = styled.div`
  margin-top: 5px;
  height: 70px;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Modal = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid black;
  max-width: 1000px;
  max-height: 600px;
  cursor: pointer;
  @media screen and (max-width: 460px) {
    max-width: 400px;
    max-height: 500px;
  }
`;
