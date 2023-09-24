import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './textEditor.module.scss';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
  ],
};

const TextEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div className={`main-content ${styles.nodesPage}`}>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1>Text Editor for Nodes</h1>
          <div className={styles.editor}>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
            />
          </div>
          <h1>Result</h1>
          <div
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      </div>
      <div className={styles.btnGroup}>
        <button>Save</button>
        <button>Download PDF</button>
      </div>
    </div>
  );
};

export default TextEditor;
