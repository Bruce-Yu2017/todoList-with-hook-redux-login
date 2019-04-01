import React from "react";
import TodoForm from "./todoForm";
import TodoTable from "./table";

const TodoDashboard = props => {
  return (
    <div>
      <TodoForm />
      <TodoTable />
    </div>
  );
};

export default TodoDashboard;
