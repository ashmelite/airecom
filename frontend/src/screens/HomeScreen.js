import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'


const HomeScreen = ({ match }) => {
  
  //search box keyword
  const keyword = match.params.keyword
  
  //pagination page number
  const pageNumber = match.params.pageNumber || 1
  
  const dispatch = useDispatch()
  
  //                                       select productList from state
  const productList = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = productList      //pull loading, error (if any) & products from state
  
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  
  
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :             //error obj comes from backend
      
      <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        
        <Paginate pages={pages} page={page} keyword={ keyword ? keyword : '' } />
      </>
      
      }
    </>
  )
}

export default HomeScreen
