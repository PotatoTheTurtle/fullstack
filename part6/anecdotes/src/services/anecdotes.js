import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () =>{
  const res = await axios.get(baseUrl);
  return res.data
};

const createAnecdote = async (data) =>{
  await axios.post(baseUrl, data);
};

export default {getAll, createAnecdote}