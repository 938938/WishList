import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemoButton from '../components/MemoButton';
import { dbService } from '../fbase';

const Memo = ({ userObj }) => {
  const [memo, setMemo] = useState([]);
  const [editMemo, setEditMemo] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService, 'memo-text'), where('creatorId', '==', `${userObj.uid}`));
    onSnapshot(q, (snapshot) => {
      const memoText = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setMemo(memoText);
      if (memo.length === 0) {
        setEditMemo('');
      } else {
        setEditMemo(memo[0].memo);
      }
    });
  }, [edit]);

  const editToggle = () => {
    setEdit((edit) => !edit);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setEditMemo(value);
  };
  const onDelete = async () => {
    try {
      await deleteDoc(doc(dbService, 'memo-text', `${memo[0].id}`));
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (e) => {
    if (memo.length === 0) {
      e.preventDefault();
      const textObj = {
        memo: editMemo,
        creatorId: userObj.uid,
        createdAt: Date.now(),
      };
      await addDoc(collection(dbService, 'memo-text'), textObj);
    } else {
      e.preventDefault();
      await updateDoc(doc(dbService, 'memo-text', `${memo[0].id}`), {
        memo: editMemo,
      });
    }
    setEdit(false);
  };
  const onCancel = () => {
    editToggle();
    setEditMemo('');
  };
  return (
    <>
      <BtnBox>
        {edit ? (
          <>
            {' '}
            <MemoButton onClick={onSubmit} text='저장' />
            <MemoButton onClick={onCancel} text='취소' />
          </>
        ) : (
          <>
            {' '}
            <MemoButton onClick={editToggle} text='수정' />
            <MemoButton onClick={onDelete} text='삭제' />
          </>
        )}
      </BtnBox>
      <MemoBox>{edit ? <Text value={editMemo} onChange={onChange} /> : <div>{memo.length === 0 ? '' : memo[0].memo}</div>}</MemoBox>
    </>
  );
};

export default Memo;

const MemoBox = styled.div`
  width: 90vw;
  height: 80vh;
  margin: 0 auto;
  background-color: #ffffff20;
  padding: 5px;
  box-sizing: border-box;
`;
const Text = styled.textarea`
  width: 90vw;
  height: 80vh;
  border: 0;
  background-color: transparent;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const BtnBox = styled.div`
  width: 200px;
  margin: 0 auto;
`;
