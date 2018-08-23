import React from 'react';

export const List = ({ onEdit, onRemove, updateToDo, list}) => {

  const edit = (e) => {
    e.preventDefault()
    onEdit(list.id, true);
  }
  let _newText, _priority, _checked;

  const remove = (e) => {
    e.preventDefault()
    onRemove(list.id)
  }
  const cancel = (e) => {
    e.preventDefault()    
    onEdit(list.id, false);
  }
  const save = () => {
    updateToDo(_newText.value, _priority.value, list.id)
  }
  const completed = () => {
    completed(_checked.value)
  }

  const renderEdit = () => {
    return (
      <li className={'edit list-group-item ' + list.priority} id='vstdaEdit'>
        <label>Desription</label>
        <textarea className='update-todo-text' ref={input => _newText = input} type='text' defaultValue={list.toDo}></textarea>

        <div className='row'>
          <div className='form-group col-xl-6'>
            <label className = 'col-sm-12 col-xl-4 col-form-label' htmlFor = 'updateToDoPriority' id='update-label'>Priority</label>
            <select className='col-sm-12 col-xl-8 update-todo-priority' id = 'updateToDoPriority' ref={input => _priority = input} defaultValue={list.priority}>
              <option value='list-group-item-success'>Low Priority</option>
              <option value='list-group-item-warning'>Medium Priority</option>
              <option value='list-group-item-danger'>High Priority</option>
            </select>
          </div>
          <div className='form-group col-sm-12 col-xl-3'>
            <button className='update-todo-btn btn btn-warning form-control float-right' onClick={cancel}>Cancel</button>
          </div>
          <div className='form-group col-sm-12 col-xl-3'>
            <button className='update-todo-btn btn btn-success float-right form-control' onClick={save}>Save</button>
          </div>
        </div>
      </li>
    )
  }

  const renderList = () => {
    return (
      <li className={'list-group-item ' + list.priority} id='list'>
        <span className='todoListText'> {list.toDo} </span>
        <span className='float-right todoListDelete'>
          <a href='#' className='delete-todo' ref={() => _newText = list.toDo} onClick={remove} style={{ color: 'red' }}>
            <i className='far fa-trash-alt float-right'></i>
          </a>
        </span>
        <span className='todoListEdit float-right'>
          <a href='#' className='edit-todo glyphicon glyphicon-edit' onClick={edit}>
            <i className='far fa-edit float-right'></i>
          </a>
        </span>
      </li>
    )
  }

  return (
    (list.editing) ? renderEdit() : renderList()
  )
}