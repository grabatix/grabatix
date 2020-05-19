/** @format */

import React from 'react'
import PropTypes from 'prop-types'

const ConsumerLayout = ({ children }) => (
  <main className="secondary">
    <div className="container">{children}</div>
  </main>
)

ConsumerLayout.propTypes = {
  children: PropTypes.node,
}

export default ConsumerLayout
