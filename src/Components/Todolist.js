import React from "react";

const Todolist = props => {
  return (
    <div>
      {props.todos.map(e => (
        <React.Fragment>
          <div className="todos" key={e._id}>
            {e.text}
            <button
              onClick={() => {
                props.delete(e._id);
              }}
            >
              Delete
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Todolist;
