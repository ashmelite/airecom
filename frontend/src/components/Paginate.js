import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {                //isAdmin is false by default, keyword is '' (empty) by default
  return (
    pages > 1 &&                      //show links (to navigate pages) only if total no. of pages is greater than 1
    (
      <Pagination>                        {/* for more info, article 13.4 @ 12:30 */}
        {[...Array(pages).keys()].map(x => (
          <LinkContainer key={x + 1} to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`} >
            <Pagination.Item active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
