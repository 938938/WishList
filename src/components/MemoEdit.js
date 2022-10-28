import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService } from '../fbase';

const MemoEdit = ({ userObj }) => {

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
  const onCancel = () => {
    setText('');
  };
  return (
    <>
      <div>
        {' '}
        <button onClick={onSubmit}>저장</button>
        <button onClick={onCancel}>취소</button>
      </div>
      <div>
        <TextBox>

        </TextBox>
      </div>
    </>
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
