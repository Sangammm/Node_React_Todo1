import React from "react";

const Todolist = props => {
  return (
    <ul>
      {props.todos.map(e => (
        <React.Fragment>
          <li key={e._id}>
            {e.text}
            <button
              onClick={() => {
                props.delete(e._id);
              }}
            >
              Delete
            </button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Todolist;
