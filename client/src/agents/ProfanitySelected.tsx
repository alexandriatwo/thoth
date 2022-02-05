import axios from "axios";
import { useEffect, useState } from 'react';

const ProfanitySelectedEditor = ({ editorId }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [data, setData] = useState([]);
  const [addNewWord, setAddNewWord] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/profanity?editor_id=${editorId}`).then(res => {
      console.log("res", res)
      let count = 0;
      let _data: any = [];
      for (let i = 0; i < res.data.data.length; i++) {
        _data.push(res.data.data[i]);
        count++;
        if (count >= 20) {
          setData(_data);
          count = 0;
          _data = [];
        }
      }
      setFirstLoad(false);
    });
  }, [])

  const addWord = async (word) => {
    if (!word || word.length <= 0) return;
    axios.post(`${process.env.REACT_APP_API_URL}/add_profanity_word`, { word: word, editorId: editorId }).then(res => {
      window.location.reload();
    });
    setAddNewWord('');
  }
  const removeWord = async (word) => {
    if (!word || word.length <= 0) return;
    await axios.post(`${process.env.REACT_APP_API_URL}/remove_profanity_word`, { word: word, editorId: editorId }).then(res => {
      window.location.reload();
    });
  }

  const getEditorName = () => {
    return editorId === 1 ? 'Bad Words' : editorId === 2 ? 'Sensitive Words' : editorId === 3 ? 'Sensitive Phrases' : editorId === 4 ? 'Leading Statements' : '';
  }
  const getDataTypeName = () => {
    return editorId === 1 ? 'Bad Word' : editorId === 2 ? 'Sensitive Word' : editorId === 3 ? 'Sensitive Phrase' : editorId === 4 ? 'Leading Statement' : '';
  }

  return (
    <div className="App">
      <div>
        {firstLoad ? (
          <h1>Loading {getEditorName()}...</h1>
        ) : (
          <div>
            <h1>{getEditorName()}:</h1>
            <label>Add {getDataTypeName()}:
              <input type='text' defaultValue='' onChange={(e) => setAddNewWord(e.target.value)} />
              <button onClick={() => addWord(addNewWord)}>Add</button>
            </label>
            <br /><br />
            Page: {currentPage + 1}:
            {data && data[currentPage] && (data[currentPage] as any).map((value, idx) => {
              return (
                <div
                  key={idx}
                >
                  <label>{value}:
                    <button onClick={() => removeWord(value)}>Remove</button>
                  </label>
                  <br /><br />
                </div>
              );
            })}
            <button onClick={() => {
              setCurrentPage(currentPage - 1);
              if (currentPage < 1) {
                setCurrentPage(1);
              }
            }}>Previous Page</button>
            <button onClick={() => {
              setCurrentPage(currentPage + 1)
              if (currentPage > data.length - 1) {
                setCurrentPage(data.length - 1)
              }
            }}>Next Page</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfanitySelectedEditor;