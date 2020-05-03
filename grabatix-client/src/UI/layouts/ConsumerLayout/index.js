import React from 'react'
import PropTypes from 'prop-types'

const ConsumerLayout = ({children}) => (
    <main>
        {children}
    </main>
)

ConsumerLayout.propTypes = {
    children: PropTypes.node
}

export default ConsumerLayout;