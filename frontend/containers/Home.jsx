import React, { PureComponent, Fragment } from 'react'
import { func, arrayOf, shape, number, string } from 'prop-types'

export default class extends PureComponent {

  static propTypes = {}

  render () {
    const {Me} = this.props
    return (
      <Fragment>

        <h1>Apollo starter</h1>
        Me: {JSON.stringify(Me)}

      </Fragment>
    )
  }
}
