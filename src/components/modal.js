import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteTodo } from "../actions/actions";
import TodoForm from "./todoForm";

const ModalWrapper = props => {
  console.log(props);
  const deleteRow = todoId => {
    props.deleteTodo(todoId);
    props.onHide();
  };
  return (
    <div>
      <Modal {...props}>
        <Modal.Header closeButton>
          {props.row.type === "delete" && <Modal.Title>Reminder</Modal.Title>}
          {props.row.type === "edit" && <Modal.Title>Edit Todo:</Modal.Title>}
        </Modal.Header>
        {props.row.type === "delete" && (
          <div>
            <Modal.Body>
              Do you want to delete this todo with content:{" "}
              <strong>{props.row.content}</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.onHide()}>
                Close
              </Button>
              <Button variant="primary" onClick={() => deleteRow(props.row.id)}>
                Delete
              </Button>
            </Modal.Footer>
          </div>
        )}
        {props.row.type === "edit" && (
          <div>
            <Modal.Body>
              <TodoForm fromEdit={true} row={props.row} onHide={props.onHide}/>
            </Modal.Body>
            
          </div>
        )}
      </Modal>
    </div>
  );
};

export default connect(
  null,
  { deleteTodo }
)(ModalWrapper);
