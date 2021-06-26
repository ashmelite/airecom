import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  
  const dispatch = useDispatch()
  
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  
  // pull success from state, since we want to show a message if profile gets updated
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile
  
  //checking to see if user is actually logged in, so we bring in userInfo from state
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if (!user.name) {
          dispatch(getUserDetails('profile'))
          dispatch(listMyOrders())
        } else {
          setName(user.name)
          setEmail(user.email)
        }
    }
  }, [dispatch, history, userInfo, user.name, user.email])
  
  
  const submitHandler = (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))        // here note: we passed name not user.name since on form change, setName will be called which will store (updated name) into name
    }
    
  }
  
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {
          message && <Message variant='danger'>{message}</Message>
        }
        {
          error && <Message variant='danger'>{error}</Message>
        }
        {
          success && <Message variant='success'>Profile Updated Successfully!</Message>
        }
        {
          loading && <Loader />
        }
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
          
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
          <Table striped bordered hover responsive className='table-sm'>
            
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {
                      order.isPaid ? order.paidAt.substring(0, 10) : 
                      (
                        <i className='fas fa-times' style={{ color: 'red' }} />
                      )
                    }
                  </td>
                  <td>
                    {
                      order.isDelivered ? order.deliveredAt.substring(0, 10) : 
                      (
                        <i className='fas fa-times' style={{ color: 'red' }} />
                      )
                    }
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button classname='btn-sm' variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
