import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {            //Arrow function
  
  const dispatch = useDispatch()
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const logoutHandler = () => {
    dispatch(logout())
  }
  
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AirEcom</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            {/* <SearchBox />  if we directly put this SearchBox component here i.e inside the Header component, it won't have access to router props like history, match since header doesn't have access either. So, we use Route component and put SearchBox inside that. For more info, article 13.3 @ 11:00 */}
            
            <Route render={({ history }) => <SearchBox history={history} /> } />
            
            <Nav className="ms-auto">       {/* Bootstrap 5 replaced left and right by start and end for RTL support. Instead of ml-auto => ms-auto (start) mr-auto => me-auto (end) */}
            <LinkContainer to='/cart'>
              <Nav.Link><i className="fas fa-shopping-cart" /> Cart</Nav.Link>
            </LinkContainer>
            {
              userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  
                </NavDropdown>
              ) :
              
            <LinkContainer to='/login'>
              <Nav.Link><i className="fas fa-user" /> Sign In</Nav.Link>
            </LinkContainer>
              
            }
            
            {
              userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  
                </NavDropdown>
              )
            }
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
