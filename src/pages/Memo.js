import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemoEdit from '../components/MemoEdit';
import { dbService } from '../fbase';

const Memo = ({ userObj }) => {
  const [memo, setMemo] = useState('');
  useEffect(() => {
    const q = query(
      collection(dbService, 'memo-text'),
      where('creatorId', '==', `${userObj.uid}`)
    );
    onSnapshot(q, (snapshot) => {
      const memoText = snapshot.docs.map((document) => ({
        ...document.data(),
      }));
      setMemo(memoText[0].memo);
    });
  }, []);
  return (
    <MemoBox>
      {/* {memo} */}
      <MemoEdit userObj={userObj} />
    </MemoBox>
  );
};

export default Memo;

const MemoBox = styled.div`
  width: 90vw;
  height: 60vh;
  margin: 0 auto;
  background-color: #ffffff20;
`;
