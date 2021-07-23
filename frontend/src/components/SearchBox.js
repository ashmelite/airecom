import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  
  const [keyword, setKeyword] = useState('')      //keyword -> represents keyword passed into search form
  
  const submitHandler = (e) => {
    e.preventDefault()
    
    if (keyword.trim()) {                         //trim() = trim white spaces
      history.push(`/search/${keyword}`)
    } else {                                      //if there is no keyword (but user clicks search) then redirect to homepage
      history.push('/')
    }
    
  }
  
  return (
    <Form onSubmit={submitHandler} className='d-flex ms-5'>
      <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5' />     {/* mr-sm = margin right, small screens;  ml-sm = margin left, small screens */}
      <Button type='submit' variant='outline-success' className='p-2 ms-2'>Search</Button>                  {/* outline-success = green outline; p-2 = padding of 2 */}
    </Form>
  )
}

export default SearchBox
