import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GREEN1, GREEN2, GREEN3, GREEN4, WHITE } from '../global/globalColor';
import Item from './Item';

const ItemList = ({ items }) => {
  const filterBox = [WHITE, GREEN1, GREEN2, GREEN3, GREEN4];
  const [filterColor, setFilterColor] = useState(WHITE);
  const [filterItems, setFilterItems] = useState(items);
  const changeFilter = (e) => {
    setFilterColor(e.target.name);
    changeItem(e.target.name);
  };
  const changeItem = (e) => {
    if (e === '#ffffff') {
      setFilterItems(items);
    } else {
      setFilterItems(items.filter((items) => items.choiceColor === e));
    }
  };
  useEffect(() => {
    setFilterItems(items);
  }, [items]);
  return (
    <ListBox bgColor={filterColor}>
      {' '}
      <FilterBox>
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
      </FilterBox>
      <Items>
        {filterItems.map((item) => {
          return <Item key={item.id} itemObj={item} />;
        })}
      </Items>
    </ListBox>
  );
};

export default ItemList;

const FilterBox = styled.div`
  position: absolute;
  top: -20px;
  left: 10px;
`;

const ListBox = styled.div`
  width: 95vw;
  height: 95vh;
  margin: 10px auto;
  background-color: ${(props) => props.bgColor}20;
  border-radius: 10px;
  position: relative;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;
