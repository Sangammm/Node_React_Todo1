import React from "react";
import { Icon } from "antd";
import { relative } from "path";

const todostylemetal = {
  backgroundColor: "rgb(165,165,165)"
};
const todostylegreen = {
  backgroundColor: "rgb(184,198,121)",
  marginLeft: "500px"
};

const Todolist = props => {
  return (
    <div className="todoroot">
      {props.todos.map(e => (
        <React.Fragment>
          <div
            className="todos"
            key={e._id}
            style={e.completed ? todostylegreen : todostylemetal}
          >
            {e.text}
            <button
              onClick={() => {
                props.delete(e._id);
              }}
            >
              <Icon type="delete" />
            </button>

            <button
              onClick={() => {
                props.toggle(e._id, !e.completed);
              }}
            >
              {e.completed ? (
                <Icon type="close-square" />
              ) : (
                <Icon type="check-square" />
              )}
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Todolist;
