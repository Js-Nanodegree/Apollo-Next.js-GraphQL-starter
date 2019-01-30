import React, { Component, Fragment } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
    const { Me, title } = this.props;

    return (
      <Fragment>
        <AppBar
          position="static"
          classes={{ root: "nav-container" }}
          style={{ backgroundColor: "#fff" }}
        >
          <Toolbar>
            <Typography color="inherit" style={{ flexGrow: 1 }}>
              {title}
            </Typography>

            {Me ? (
              <p>Welcome {Me.firstName}</p>
            ) : (
              <Fragment>
                <Link prefetch href="/login">
                  <Button>Login</Button>
                </Link>
                <Link prefetch href="/register">
                  <Button>Register</Button>
                </Link>
              </Fragment>
            )}
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
