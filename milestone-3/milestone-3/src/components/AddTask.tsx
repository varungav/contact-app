import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Todo } from '../App';
import toast from 'react-hot-toast';

interface AddTaskProps {
  setTodoLists: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const AddTask: React.FC<AddTaskProps> = ({ setTodoLists }) => {
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (task.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title: task.trim(),
      isCompleted: false,
    };
    console.log(newTodo);

    setTodoLists(prev => [...prev, newTodo]);
    toast.success('Task added successfully')
    navigate('/'); // Go back to home after adding task
  };

  return (
    <div className="px-4 md:px-16 pt-8 md:pt-12 max-w-3xl mx-auto min-h-screen flex flex-col">
  {/* Header */}
  <div className="flex flex-row-reverse justify-between items-start">
    <div className="h-9 cursor-pointer" onClick={() => navigate('/')}>
      <img src="src/assets/x-close.png" alt="Close" className="h-9 w-9" />
    </div>
    <div className="mt-1 md:mt-3 mt-11">
      <h2 className="font-bold text-2xl">Today</h2>
      <p className="text-md text-[#7D7878]">March 4, 2010</p>
    </div>
  </div>

  {/* Input */}
  <div className="pt-9 flex-1">
    <textarea
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Add new task....."
      rows={1}
      className="text-2xl md:text-4xl font-light pl-4 border-l-4 border-[#7D7878] focus:outline-none focus:ring-0 w-full resize-none overflow-hidden leading-snug"
      onInput={(e) => {
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
      }}
    />
  </div>

  {/* Save Task Button */}
  <div className="mt-auto flex justify-center pb-6 md:pb-12">
    <button
      onClick={handleSave}
      className="bg-[#007272] w-full h-[60px] md:w-[384px] text-white rounded text-lg font-medium whitespace-nowrap flex items-center justify-center"
    >
      {/* <span className="block md:hidden">Save</span> */}
      <span className="">Add Task</span>
    </button>
  </div>
</div>

  );
};

export default AddTask;
