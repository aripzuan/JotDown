import React from 'react';
import CreateNote from './components/CreateNote';
import NotesList from './components/NotesList';

const App = () => {
  const userId = 'test_uid'; // Replace later with Firebase UID

  return (
    <div>
      <h1>📝 JotDown</h1>
      <CreateNote userId={userId} />
      <hr />
      <NotesList userId={userId} />
    </div>
  );
};

export default App;
