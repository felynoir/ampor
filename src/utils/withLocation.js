import React from 'react'
import queryString from 'query-string'
import { Location } from '@reach/router'
import { navigate } from 'gatsby'

const withLocation = WrappedComponent => props => {
  return (
    <Location>
      {({ location }) => (
        <WrappedComponent
          {...props}
          location={location}
          params={location.search ? queryString.parse(location.search) : {}}
          navigate={navigate}
        />
      )}
    </Location>
  )
}

export default withLocation
