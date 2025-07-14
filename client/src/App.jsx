import React from 'react';
import CreateNote from './components/CreateNote';

const App = () => {
  return (
    <div>
      <h1>📝 JotDown</h1>
      <CreateNote userId="test_uid" /> {/* Replace with real user ID later */}
    </div>
  );
};

export default App;
