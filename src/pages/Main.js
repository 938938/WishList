import React, { useState } from 'react';
import { BLUE, GREEN, RED, VIOLET, WHITE, YELLOW } from '../global/globalColor';

const Main = () => {
  const colorBox = [RED, YELLOW, GREEN, BLUE, VIOLET];
  const [photoFile, setPhotoFile] = useState();

  const onFileChange = (e) => {};
  return (
    <div>
      {colorBox.map((color) => {
        return (
          <button style={{ width: 30, height: 20, backgroundColor: color }} />
        );
      })}
      <div style={{ border: '1px solid black' }}>
        <form>
          <img
            src={photoFile ? photoFile : ''}
            style={{ width: 100, height: 100, border: '1px solid black' }}
          />
          <input
            id='attach-file'
            type='file'
            accept='image/*'
            onChange={onFileChange}
          />
          <div>
            <input placeholder='Link' />
          </div>
          <input placeholder='추가 정보' />
        </form>
      </div>
    </div>
  );
};

export default Main;
