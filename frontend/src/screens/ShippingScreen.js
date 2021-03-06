import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  
  const [address, setAddress] = useState(shippingAddress.address)               //ShippingAddress, if it exists in state will be pulled out (see above, useSelector) and from that address will be filled in our initialState using useState 
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  
  const dispatch = useDispatch()
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  
  
  //*****
  // Added functionality on top
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])
  // Above piece checks if a user logs out on shipping page, then push to login page
  //*****
  
  
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>              {/* pass in step1 & step2 as props; see article 9.2 @ 04:00 */}
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter Address' value={address} required onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter City' value={city} required onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
        </Form.Group>
        
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder='Enter Country' value={country} required onChange={(e) => setCountry(e.target.value)} />
        </Form.Group>
        
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
