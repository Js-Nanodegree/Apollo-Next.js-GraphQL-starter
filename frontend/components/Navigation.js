import React, { Component, Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Me from '../components/queries/Me.query';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { title } = this.props;

    return (
      <Fragment>
        <AppBar position="static" classes={{ root: 'nav-container' }}>
          <Toolbar>
            <Typography color="inherit" style={{ flexGrow: 1 }}>
              {title}
            </Typography>

            <Me>
              {({ data: { Me: user } }) => {
                if (user) {
                  return <p>Welcome {user.firstName}</p>;
                }

                return (
                  <Fragment>
                    <Link prefetch href="/login">
                      <Button>Login</Button>
                    </Link>
                    <Link prefetch href="/register">
                      <Button>Register</Button>
                    </Link>
                  </Fragment>
                );
              }}
            </Me>
          </Toolbar>
        </AppBar>

        <style jsx>{`
          .nav-container {
            flex-grow: 1;
            background-color: #fff !important;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default Navigation;
