import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { BLUE, GREEN, RED, VIOLET, WHITE, YELLOW } from '../global/globalColor';

import ItemCreator from '../components/ItemCreator';
import Item from '../components/Item';

const Main = ({ userObj }) => {
  const filterBox = [WHITE, RED, YELLOW, GREEN, BLUE, VIOLET];
  const [filterColor, setFilterColor] = useState(WHITE);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'wish-item'),
      where('creatorId', '==', `${userObj.uid}`)
      // orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const itemArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setItems(itemArr);
    });
  }, []);

  const changeFilter = (e) => {
    setFilterColor(e.target.name);
  };
  return (
    <div>
      <ItemCreator userObj={userObj} />
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
          border: '1px solid black',
          backgroundColor: filterColor,
        }}
      >
        {items.map((item) => {
          return <Item key={item.id} itemObj={item} />;
        })}
      </div>
    </div>
  );
};

export default Main;
