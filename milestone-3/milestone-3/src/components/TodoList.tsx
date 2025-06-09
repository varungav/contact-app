import React from 'react';
import type { Todo } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  todoLists: Todo[];
  setTodoLists: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todoLists, setTodoLists }) => {
  const navigate = useNavigate();

  const handleCompleted = (id: number) => {
    const updated = todoLists.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoLists(updated);
  };

  const handleDelete = (id: number) => {
    const updated = todoLists.filter((todo) => todo.id !== id);
    setTodoLists(updated);
    toast.success('Task Deleted Successfully');
  };

  const handleEditClick = (todo: Todo) => {
    navigate('/edit-task', { state: { todo } });
  };
  
  // Sort todos (incomplete first)
  const sortedTodos = [...todoLists].sort(
    (a, b) => Number(a.isCompleted) - Number(b.isCompleted)
  );

  return (
    <div className="">
      {sortedTodos.length === 0 ? (
          <p className="">
            No tasks available
          </p>
      ) : (
        sortedTodos.map((todo) => (
          <div
            key={todo.id}
            className={`bg-[#7F7F7F1A] w-full px-4 py-4 flex flex-col rounded-md transition-all duration-300 space-y-2 ${
              todo.isCompleted ? 'opacity-70 translate-y-2' : 'opacity-100'
            }`}
            >
            <div className="flex items-start justify-between gap-4">
              {/* Left side: Checkbox + title */}
              <div className="flex items-start w-full pr-4">
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={todo.isCompleted}
                  onChange={() => handleCompleted(todo.id)}
                  className="w-5 h-5 mt-1"
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`ml-3 text-lg font-medium break-words whitespace-normal w-full ${
                    todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {todo.title}
                </label>
              </div>

              {/* Right side: Icons */}
              <div className="flex-shrink-0 flex space-x-4 items-start">
                <img
                  src="src/assets/edit.png"
                  alt="edit"
                  onClick={() => handleEditClick(todo)}
                  className="h-[25.83px] w-[25.83px] cursor-pointer"
                />
                <img
                  src="src/assets/trash-2.png"
                  alt="delete"
                  onClick={() => handleDelete(todo.id)}
                  className="h-[25.83px] w-[25.83px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
