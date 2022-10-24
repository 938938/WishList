import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import ItemCreator from '../components/ItemCreator';
import Line from '../UI/Line';
import ItemList from '../components/ItemList';

const Main = ({ userObj }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'wish-item'),
      where('creatorId', '==', `${userObj.uid}`),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const itemArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setItems(itemArr);
    });
  }, []);

  return (
    <div>
      <ItemCreator userObj={userObj} />
      <Line />
      {/* <div
        style={{
          width: 800,
          border: '1px solid black',
          backgroundColor: filterColor,
        }}
      >
        {items.map((item) => {
          return <Item key={item.id} itemObj={item} />;
        })}
      </div> */}
      <ItemList items={items} />
    </div>
  );
};

export default Main;
