import React from "react"
import {create} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";

const CreateAnecdote = (props) =>{
  const handleCreateAnecdote = (event) =>{
    event.preventDefault();
    props.store.dispatch(create(event.target.anecdote.value));
    props.store.dispatch(createNotification(event.target.anecdote.value))
  };

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button type={"submit"}>create</button>
      </form>
    </div>
  )
};

export default CreateAnecdote