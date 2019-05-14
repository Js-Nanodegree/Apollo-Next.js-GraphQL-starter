import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { string } from 'prop-types';
import styled from 'styled-components';
import Me from './queries/Me.query';

const NavContainer = styled(AppBar)`
  flex-grow: 1;
`;

class Navigation extends Component {
  static propTypes = {
    title: string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <>
        <NavContainer position='static' classes={{ root: 'nav-container' }}>
          <Toolbar>
            <Typography color='inherit' style={{ flexGrow: 1 }}>
              {title}
            </Typography>

            <Me>
              {({ data: { Me: user } }) => {
                if (user) {
                  return (
                    <>
                      <Link prefetch href='/invite'>
                        <Button type='button'>Invite</Button>
                      </Link>
                    </>
                  );
                }

                return (
                  <Fragment>
                    <Link prefetch href='/login'>
                      <Button>Login</Button>
                    </Link>
                    <Link prefetch href='/register'>
                      <Button>Register</Button>
                    </Link>
                  </Fragment>
                );
              }}
            </Me>
          </Toolbar>
        </NavContainer>
      </>
    );
  }
}

export default Navigation;
