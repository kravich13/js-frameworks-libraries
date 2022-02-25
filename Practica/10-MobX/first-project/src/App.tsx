import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { Comments } from './components/Comments';
import { Navbar } from './components/Navbar';
import { Todos } from './components/Todos';

function App() {
  const [page, setPage] = useState('Todos');

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="App">
        <h1>Test React-query</h1>
        <Navbar setPage={setPage} />
        <div>{page === 'Todos' ? <Todos /> : <Comments />}</div>

        {/* <PostForm />
        <Posts />
        <AsyncPosts /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
