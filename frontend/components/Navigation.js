import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { compose, graphql } from 'react-apollo'
import withData from '../lib/withData'
import gql from 'graphql-tag'

class Navigation extends Component {

  constructor (props) {
    super(props)

  }

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render () {
    const {Me, title} = this.props

    return (<Fragment>

        <AppBar position="static" classes={{root: 'nav-container'}} style={{backgroundColor: '#fff'}}>
          <Toolbar>

            <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
              {title}
            </Typography>

            {Me ?
              <p>Welcome {Me.firstName}</p>
              : <Link
                prefetch
                href="/login"><Button>Login</Button></Link>

            }

          </Toolbar>
        </AppBar>


        <style jsx>{`

      .nav-container {
        flex-grow: 1;
        background-color: #fff !important;
      }

    `}</style>
      </Fragment>
    )
  }
}

export default Navigation

