import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService } from '../fbase';

const MemoEdit = ({ userObj }) => {
  const [text, setText] = useState('');
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setText(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const textObj = {
      text,
      creatorId: userObj.uid,
    };
    await addDoc(collection(dbService, 'memo-text'), textObj);
  };
  return (
    <div>
      {/* <div>
        {' '}
        <button onClick={onSubmit}>저장</button>
      </div> */}
      <TextBox>
        <Text value={text} onChange={onChange} />
      </TextBox>
    </div>
  );
};

export default MemoEdit;

const TextBox = styled.div`
  /* width: 90vw;
  height: 60vh;
  margin: 0 auto;
  background-color: #ffffff20; */
`;
const Text = styled.textarea`
  width: 90vw;
  height: 60vh;
  border: 0;
  background-color: transparent;
  resize: none;
`;
