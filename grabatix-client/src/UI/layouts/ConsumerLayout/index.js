/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import ConsumerDashboard from '../../components/ConsumerDashboard'

const ConsumerLayout = ({ children }) => (
  <main className="secondary">
    <ConsumerDashboard>
      <div className="container">{children}</div>
    </ConsumerDashboard>
  </main>
)

ConsumerLayout.propTypes = {
  children: PropTypes.node,
}

export default ConsumerLayout
