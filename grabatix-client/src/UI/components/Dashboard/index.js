/** @format */

import React from 'react'
import Proptypes from 'prop-types'
import FlexContainer from '../FlexContainer'
import ProfileBlock from '../ProfileBlock'
import Media from 'react-media'

const Dashboard = ({ children }) => (
  <FlexContainer flexClasses="row justify-content-center align-start">
    <Media
      queries={{
        mobile: `(max-width: 680px)`,
        desktop: `(min-width: 681px)`,
      }}
    >
      {matches => (
        <>
          {matches.desktop && (
            <>
              <FlexContainer
                flexClasses="column justify-content-start align-start flex-grow-1 flex-shrink-0"
                utilityClasses="dashboard-left p-1"
              >
                <ProfileBlock />
              </FlexContainer>
              <FlexContainer
                flexClasses="flex-grow-5 flex-shrink-1"
                utilityClasses="dashboard-right"
              >
                {children}
              </FlexContainer>
            </>
          )}
          {matches.mobile && (
            <FlexContainer
              flexClasses="flex-grow-5 flex-shrink-1"
              utilityClasses="dashboard-full"
            >
              {children}
            </FlexContainer>
          )}
        </>
      )}
    </Media>
  </FlexContainer>
)

Dashboard.propTypes = {
  children: Proptypes.node.isRequired,
}

export default Dashboard
