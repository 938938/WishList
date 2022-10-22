import React, { useState } from 'react';
import { GREEN1, GREEN2, GREEN3, GREEN4, WHITE } from '../global/globalColor';
import Item from './Item';

const ItemList = ({ items }) => {
  const filterBox = [WHITE, GREEN1, GREEN2, GREEN3, GREEN4];
  const [filterColor, setFilterColor] = useState(WHITE);
  const changeFilter = (e) => {
    setFilterColor(e.target.name);
  };
  return (
    <>
      {' '}
      {filterBox.map((color) => {
        return (
          <button
            key={color}
            name={color}
            style={{ backgroundColor: color }}
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
    </>
  );
};

export default ItemList;
