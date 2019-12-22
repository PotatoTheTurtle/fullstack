import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Link} from 'react-router-dom'

import {initializeUsers} from "../reducers/usersReducer";

const Users = (props) =>{

  useEffect(()=>{
    props.initializeUsers()
  },[]);

  console.log(props.users);

  return(
    <div>
      <h2>Users</h2>
      {props.users.map(user => <li><Link to={"/users/" + user.id}>{user.name}</Link> {user.blogs.length} blogs</li>)}
    </div>
  )
};

const mapStateToProps = (state) =>{
  return{
    users: state.users
  }
};

const mapDispatchToProps = {
  initializeUsers
};

const connectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users);
export default connectedUsers