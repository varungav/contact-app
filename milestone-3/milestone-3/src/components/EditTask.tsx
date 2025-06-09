import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Todo } from '../App';
import toast from 'react-hot-toast';

interface EditTaskProps {
  todoLists: Todo[];
  setTodoLists: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const EditTask: React.FC<EditTaskProps> = ({ todoLists, setTodoLists }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const todo = location.state?.todo as Todo | undefined;
  const [editTitle, setEditTitle] = useState(todo?.title || '');

  useEffect(() => {
    if (!todo) {
      navigate('/');
    }
  }, [todo, navigate]);

  const handleSaveEdit = () => {
    if (!todo) return;
    const updated = todoLists.map((t) =>
      t.id === todo.id ? { ...t, title: editTitle.trim() } : t
    );
    setTodoLists(updated);
    toast.success('Todo edited successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 md:px-16 pt-16 md:pt-32 max-w-3xl mx-auto">
      {/* X Icon */}
      <div
        className="absolute top-[calc(8rem-12px)] right-4 md:right-16 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src="src/assets/x-close.png" alt="Close" className="h-9 w-9" />
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="font-bold text-2xl">Today</h2>
        <p className="text-md text-[#7D7878]">March 4, 2010</p>
      </div>

      {/* Input */}
      <div className="pt-9 flex-1">
        <textarea
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Edit task..."
          rows={1}
          className="text-2xl md:text-4xl font-light pl-4 border-l-4 border-[#7D7878] focus:outline-none focus:ring-0 w-full resize-none overflow-hidden leading-snug"
          onInput={(e) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
      </div>

      {/* Save Button */}
      <div className="mt-auto flex justify-center pb-6 md:pb-12">
        <button
          onClick={handleSaveEdit}
          className="bg-[#007272] w-full h-[60px] md:w-[384px] text-white rounded text-lg font-medium whitespace-nowrap flex items-center justify-center"
        >
          <span className="block md:hidden">Save</span>
          <span className="hidden md:block">Save Task</span>
        </button>
      </div>
    </div>
  );
};

export default EditTask;
