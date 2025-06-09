import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import type { Todo } from '../App';

interface BodyProps {
  todoLists: Todo[];
  setTodoLists: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Body: React.FC<BodyProps> = ({ todoLists, setTodoLists }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate('/add-task');
      setClicked(false); // reset after navigation
    }, 200); // Delay for animation effect
  };

  return (
    <div className="relative p-6 lg:px-16 lg:pt-12 min-h-screen">
      {/* Today Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">Today</h2>
          <p className="text-md text-[#7D7878]">March 4, 2010</p>
        </div>
        <div>
          <button
            className="bg-[#007272] hidden lg:inline-block
            px-4 py-2 rounded-lg text-white whitespace-nowrap"
            onClick={() => navigate('/add-task')}
          >
            Add New Task +
          </button>
        </div>
      </div>

      {/* Todo-list section */}
      <TodoList todoLists={todoLists} setTodoLists={setTodoLists} />

      {/* Floating Button (mobile only) */}
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center 
        bg-teal-700 text-white text-3xl shadow-lg transition-transform duration-300 ease-in-out 
       lg:hidden z-50
        ${clicked ? "rotate-45 scale-110" : "rotate-0 scale-100"}
        `}
      >
        +
      </button>
    </div>
  );
};

export default Body;
