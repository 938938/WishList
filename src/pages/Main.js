import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import ItemCreator from '../components/ItemCreator';
import Line from '../UI/Line';
import ItemList from '../components/ItemList';
import { IoMdAdd } from 'react-icons/io';
import styled from 'styled-components';

const Main = ({ userObj }) => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService, 'wish-item'), where('creatorId', '==', `${userObj.uid}`), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const itemArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setItems(itemArr);
    });
  }, []);

  const onModal = () => {
    setModal((modal) => !modal);
  };

  return (
    <div>
      <AddBtn onClick={onModal}>
        <IoMdAdd className='icon' />
        <p>Add Item</p>
      </AddBtn>
      {modal ? <ItemCreator userObj={userObj} setModal={setModal} /> : <></>}
      <Line />
      <ItemList items={items} />
    </div>
  );
};

export default Main;

const AddBtn = styled.button`
  width: 100vw;
  height: 40px;
  background-color: transparent;
  font-size:15px;
  p {
    display: none;
  }
  &:hover {
    .icon {
      display: none;
    }
    p {
      display: block;
    }
  }
`;
