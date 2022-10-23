import React, { useState } from 'react';
import styled from 'styled-components';
import { GREEN1, GREEN2, GREEN3, GREEN4, WHITE } from '../global/globalColor';
import Item from './Item';

const ItemList = ({ items }) => {
  const filterBox = [WHITE, GREEN1, GREEN2, GREEN3, GREEN4];
  const [filterColor, setFilterColor] = useState(WHITE);
  const changeFilter = (e) => {
    setFilterColor(e.target.name);
  };
  return (
    <ListBox bgColor={filterColor}>
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
      <div>
        {items.map((item) => {
          return <Item key={item.id} itemObj={item} />;
        })}
      </div>
    </ListBox>
  );
};

export default ItemList;

const ListBox = styled.div`
  width: 95vw;
  margin: 0 auto;
  background-color: ${(props) => props.bgColor};
  position: relative;
`;
