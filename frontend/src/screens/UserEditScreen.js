import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  
  const userId = match.params.id
  
  // these are default values of name, email & isAdmin (for empty form, i.e. when details have not been fetched)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  
  const dispatch = useDispatch()
  
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  
  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
  
  useEffect(() => {
    
    if (successUpdate) {                        //reset the state when user gets updated successfully 
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {                    // !user.name -> make sure that user is not already there, only then fetch the user; same for OR condition i.e.  if user id (from state) does not match the user id from url, then fetch the user (from url id); see article 11.6 @ 8:30 for details
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
      
  }, [user, dispatch, userId, successUpdate, history])
  
  
  const submitHandler = (e) => {
    e.preventDefault()
    
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))         // _id: userId is not renaming (like when we destructure), it means set value of _id as userId
    
  }
  
  return (
    <>
      <Link to='/admin/userlist/' className='btn btn-light my-3'>
        Go Back
      </Link>
      
      <FormContainer>
        <h1>Edit User</h1>
        { loadingUpdate && <Loader /> }
        { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }        
        {
          loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
          (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              
              <Form.Group controlId='isadmin'>
                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
              </Form.Group>
              
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          )
        }
        
      </FormContainer>
    </>
    
  )
}

export default UserEditScreen
