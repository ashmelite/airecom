import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  
  const cart = useSelector(state => state.cart)
  const { ShippingAddress } = cart
  
  const [address, setAddress] = useState(ShippingAddress.address)               //ShippingAddress, if it exists in local storage will be pulled out (see above, useSelector) and from that address will be filled in our initialState using useState 
  const [city, setCity] = useState(ShippingAddress.city)
  const [postalCode, setPostalCode] = useState(ShippingAddress.postalCode)
  const [country, setCountry] = useState(ShippingAddress.country)
  
  const dispatch = useDispatch()
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  
  return (
    <FormContainer>
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
