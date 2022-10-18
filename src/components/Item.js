import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';
import { WHITE } from '../global/globalColor';

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
    <div>
      <img
        src={itemObj.photoUrl}
        style={{
          width: 100,
          height: 100,
          border: `1px solid black`,
          background: WHITE,
        }}
      />
      {/* <div><a ref={itemObj.siteLink} /></div> */}
      <button onClick={() => window.open(itemObj.siteLink, '_blank')}>
        링크
      </button>
      <div>{itemObj.text}</div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Item;
