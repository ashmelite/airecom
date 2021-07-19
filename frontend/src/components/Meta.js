//this is a wrapper component for React Helmet so that we can pass title, desc, keywords for each Screen/Page dynamically

import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to AirEcom',
  description: 'We sell the best products for cheap',
  keywords: 'Electronics, Buy Electronics, Cheap Electronics'
}

export default Meta
