import React from "react";

const Todolist = props => {
  console.log(props);

  return (
    <ul>
      {props.todos.map(e => (
        <li key={e._id}>{e.text}</li>
      ))}
    </ul>
  );
};

export default Todolist;
