import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  GREEN1,
  GREEN2,
  GREEN3,
  GREEN4,
  WHITE,
} from '../../global/globalColor';
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
    if (e === WHITE) {
      setFilterItems(items);
    } else {
      setFilterItems(items.filter((items) => items.choiceColor === e));
    }
  };
  useEffect(() => {
    setFilterItems(items);
  }, [items]);
  return (
    <ListBox>
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
      <ItemBox bgColor={filterColor}>
        <Items>
          {filterItems.map((item) => {
            return <Item key={item.id} itemObj={item} />;
          })}
        </Items>
      </ItemBox>
    </ListBox>
  );
};

export default ItemList;

const ListBox = styled.div`
  position: relative;
`;

const FilterBox = styled.div`
  position: absolute;
  top: -20px;
  left: 6vw;
`;

const ItemBox = styled.div`
  width: 90vw;
  height: 75vh;
  margin: 40px auto;
  background-color: ${(props) => props.bgColor};
  border-radius: 2px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
