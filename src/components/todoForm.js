import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'uuid';
import { createTodo, editTodo } from '../actions/actions';

const TodoForm = props => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState(null);
  const [isContentTouched, setContentTouch] = useState(false);
  const [isDateTouched, setDateTouch] = useState(false);

  useEffect(() => {
    if (props.fromEdit) {
      setContent(props.row.content);
      setDate(new Date(props.row.date));
    }
  }, [])

  const submitTodo = (e) => {
    e.preventDefault();
    if (!props.fromEdit) {
      let obj = {
        content: content,
        id: uuid.v1(),
        date: date,
        userId: props.id
      }
      props.createTodo(obj);
    }
    else {
      let obj = {
        content: content,
        date: date
      }
      props.editTodo(props.row.id, obj);
      props.onHide();
    }
    setContent('');
    setDate(null);
  }

  const dateChange = (date) => {
    setDate(date);
  } 

  const contentOnChange = (content) => {
    setContent(content);
  }

  const contentOnBlur = () => {
    setContentTouch(true);
  }
  const dateOnBlur = () => {
    setDateTouch(true);
  }


  return (
    <div className={props.fromEdit ? "" : "mt-3"}>
      {!props.fromEdit && <h2 className='title'>Create your Todo</h2>}
      
      <form onSubmit={(e) => {submitTodo(e)}}>
        <div className="form-group">
          <label>Content</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Content"
            value={content}
            onChange={(e) => contentOnChange(e.target.value)}
            onBlur={()=> {contentOnBlur()}}
          />
          {/* {content.length === 0 && isContentTouched && <span style={{ "display": "block", "color": "red"}}>Content is required.</span>} */}
        </div>
        <div className="form-group">
          <label style={{"display": "block"}}>Date</label>
          <DatePicker
            className="form-control"
            selected={date}
            minDate={new Date()}
            onChange={(selectedDate) => dateChange(selectedDate)}
            onBlur={() => dateOnBlur()}
            placeholderText="Select a date"
          />
          {/* {date === null && isDateTouched && <span style={{ "display": "block", "color": "red"}}>Date is required.</span>} */}
        </div>
        <button type="submit" className="btn btn-primary">
          {props.fromEdit ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.navBarState;
}

export default connect(mapStateToProps, { createTodo, editTodo })(TodoForm);
