import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Body from './components/Body';
import AddTask from './components/AddTask';
import { Toaster } from 'react-hot-toast';
import EditTask from './components/EditTask';
import { useIsMobile } from './hooks/useIsMobile'; // <-- new hook file

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const isMobile = useIsMobile();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body todoLists={todoLists} setTodoLists={setTodoLists} />} />
        <Route path="/add-task" element={<AddTask setTodoLists={setTodoLists} />} />
        <Route path="/edit-task" element={<EditTask todoLists={todoLists} setTodoLists={setTodoLists} />} />
      </Routes>

      <Toaster
  position={isMobile ? 'bottom-center' : 'top-right'}
  toastOptions={{
    className: 'custom-toast',
    style: {
      background: '#000',
      color: '#fff',
      minWidth: '336px',       // allow growth if needed
      height: '54px',
      opacity: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    icon: null,
  }}
  containerStyle={{
    top: isMobile ? undefined : '20px',
    bottom: isMobile ? '20px' : undefined,
    right: '20px',
    left: isMobile ? '16px' : undefined,
  }}
/>


    </Router>
  );
}

export default App;
