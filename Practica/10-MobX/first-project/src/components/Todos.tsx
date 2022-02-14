import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Todo } from './Todo';

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
  return res.json();
};

export const Todos: FC = () => {
  const { data, status } = useQuery('Todos', fetchTodos);

  return (
    <div>
      <h2>Todos</h2>

      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.map((todo: any) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>
      )}
    </div>
  );
};
