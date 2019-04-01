import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import { getAllTodosByOneUser } from "../actions/actions";
import history from "../history";
import ModalWrapper from "./modal";

const TodoTable = props => {
  useEffect(() => {
    getTodosByThisUser();
  }, []);

  const [deleteModalState, setDeleteModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const getTodosByThisUser = () => {
    const userId = history.location.pathname.slice(
      6,
      history.location.pathname.length
    );
    props.getAllTodosByOneUser(userId);
  };

  const openModal = (todo, index, type) => {
    if (type === "delete") {
      setDeleteModalState(true);
      setSelectedRow({ ...todo, index: index, type: type });
    }
    else {
      setEditModalState(true);
      setSelectedRow({...todo, index: index, type: type})
    }
  };

  const modalClose = () => {
    setDeleteModalState(false);
    setEditModalState(false)
  };

  const renderRows = () => {
    if (props.tableState.length === 0) {
      return (
        <tr>
          <td>Loading</td>
        </tr>
      );
    }
    return props.tableState.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index}</td>
          <td>{item.content}</td>
          <td>{new Date(item.date).toLocaleDateString()}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => openModal(item, index, "delete")}
            >
              Delete
            </button>
            <button
              className="btn btn-warning ml-2"
              onClick={() => openModal(item, index, "edit")}>Edit</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      {props.tableState.length > 0 && (
        <Table bordered hover className="mt-3 text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Content</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </Table>
      )}
      <>
        {deleteModalState && (
          <ModalWrapper row={selectedRow} show={deleteModalState} onHide={() => modalClose()} />
        )}
        {editModalState && (
          <ModalWrapper row={selectedRow} show={editModalState} onHide={() => modalClose()} />
        )}
      </>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { getAllTodosByOneUser }
)(TodoTable);
