import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MemoApp = () => {
  const [memo, setMemo] = useState('');
  const [memoList, setMemoList] = useState([]);
  const navigate = useNavigate();

  const addMemo = useCallback(() => {
    if (memo.trim() === '') return; 
    const newMemo = {
      id: Date.now(),
      content: memo,
    };
    setMemoList((prevMemoList) => [...prevMemoList, newMemo]);
    setMemo('');
  }, [memo]);

  const editMemo = useCallback((id, newContent) => {
    setMemoList((prevMemoList) =>
      prevMemoList.map((memo) => (memo.id === id ? { ...memo, content: newContent } : memo))
    );
  }, []);

  const deleteMemo = useCallback((id) => {
    setMemoList((prevMemoList) => prevMemoList.filter((memo) => memo.id !== id));
  }, []);

  const saveMemoToFile = useCallback(() => {
    const blob = new Blob([memo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [memo]);

  return (
    <div className="memo-container" style={{ backgroundColor: '#f7f9fc', minHeight: '100vh', paddingTop: '64px', fontFamily: 'Arial, sans-serif' }}>
      <AppBar position="fixed" style={{ backgroundColor: '#4a90e2', zIndex: 1300 }}>
        <Toolbar style={{ width: '100%' }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate(-1)} 
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            style={{ 
              flexGrow: 1, 
              textAlign: 'center', 
              fontFamily: 'BlackItalic', 
              marginRight: '100px'
            }}
          >
            <span style={{ color: '#ffffff' }}>Aer</span>
            <span style={{ color: '#ff6f61' }}>hythm</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <h2 style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>오늘의 있었던 일을 기록해보세요!</h2>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 작성하세요..."
        style={{ 
          width: '95%', 
          height: '450px',
          margin: '0 auto 10px', 
          display: 'block', 
          padding: '10px', 
          borderRadius: '8px', 
          border: '1px solid #ddd', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <button onClick={addMemo} style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>메모 저장</button>
        <button onClick={saveMemoToFile} style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>파일로 저장</button>
      </div>

      <div>
        <h3 style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>저장된 메모</h3>
        <ul className="memo-list" style={{ listStyle: 'none', padding: 0 }}>
          {memoList.map((memo) => (
            <li key={memo.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <textarea
                value={memo.content}
                onChange={(e) => editMemo(memo.id, e.target.value)}
                style={{ width: '90%', height: '80px', margin: '0 auto 5px', display: 'block', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
              />
              <button onClick={() => deleteMemo(memo.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemoApp;