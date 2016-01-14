import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default class Navigation extends React.Component {
  static propTypes = {
    routes: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired,
    user: React.PropTypes.object.isRequired
  }

  render () {
    const { routes } = this.props;
    var navitems = routes[0].childRoutes[0].childRoutes.map(function (route, index) {
      return (<LinkContainer to={route.path} key={index}>
        <NavItem eventKey={index + 1}>{route.name}</NavItem>
      </LinkContainer>);
    });

    return (<Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='/'>{this.props.title}</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <IndexLinkContainer to='/'><NavItem eventKey={1}>Home</NavItem></IndexLinkContainer>
        {navitems}
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={3} title={this.props.user.username}>
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem divider />
          <LinkContainer to='/auth/logout'><MenuItem eventKey={3.3}>Logout</MenuItem></LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>);
  }
};
