import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../fbase';
import { WHITE } from '../global/globalColor';
import Card from '../UI/Card';
import { AiOutlineLink } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Item = ({ itemObj }) => {
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
  return (
    <Card>
      <ImgBox>
        {itemObj.photoUrl ? (
          <ImgItem
            src={itemObj.photoUrl}
            style={{
              width: 100,
              height: 100,
              border: `1px solid black`,
              background: WHITE,
            }}
          />
        ) : (
          <p>?</p>
        )}
      </ImgBox>
      {/* <div><a ref={itemObj.siteLink} /></div> */}
      <div>
        <div>
          <button onClick={() => window.open(itemObj.siteLink, '_blank')}>
            <AiOutlineLink />
          </button>
          <button onClick={onDelete}>
            <RiDeleteBin5Line />
          </button>
        </div>
        <div>{itemObj.text}</div>
      </div>
    </Card>
  );
};

export default Item;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
`;

const ImgItem = styled.img`
  border: 0;
  cursor: pointer;
`;
