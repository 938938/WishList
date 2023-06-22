import React from 'react';
import ReactQuill from 'react-quill';

const MemoEdit = ({ value }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
        ['image', 'code-block'],
        ['clean'],
      ],
    },
  };
  return (
    <>
      <div>{value}</div>
      <ReactQuill modules={modules} value={value} />
    </>
  );
};

export default MemoEdit;
