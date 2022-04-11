import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Col, Row, Container } from 'react-bootstrap';
import { Content, CardButtonMenu, NavMenu, DashboardContent, MenuLateralItem, MenuLateralExit } from './styles';
import logo from '../../assets/logoazul.png'
import { IoIosNotifications } from 'react-icons/io';
import { BiBuildings, BiUser, BiExit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';




const Dashboard: React.FC = ({ children }) => {
  const { singOut, user } = useAuth();

  return (
    <Content fluid>
      <Row>
        <NavMenu collapseOnSelect expand="lg" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <Container>
            <Navbar.Brand href="#home"><img src={logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">

              </Nav>
              <Nav>
                {/* menu > md */}
                <Nav.Link href="#deets" className="d-none d-lg-block">
                  <CardButtonMenu style={{ border: 'none' }}>
                    <IoIosNotifications size={24} color={'#111727'} />
                  </CardButtonMenu>
                </Nav.Link>

                <Nav.Link eventKey={2} href="#memes" className="d-none d-lg-block">
                  <CardButtonMenu>K</CardButtonMenu>
                </Nav.Link>

                <NavDropdown title={user.name} id="collasible-nav-dropdown" className="d-none d-lg-block" style={{ color: '#111727', alignItems: 'center', display: 'flex' }}>
                  <NavDropdown.Item onClick={singOut}><BiExit size={22}></BiExit>Sair</NavDropdown.Item>
                </NavDropdown>

                {/* menu mobile */}
                <div>
                  <Nav.Link href='/' className="d-none d-md-block d-lg-none">
                    <MenuLateralItem><BiBuildings size={22} />Filiais</MenuLateralItem>
                  </Nav.Link>
                  <Nav.Link href='/employees' className="d-none d-md-block d-lg-none">
                    <MenuLateralItem><BiUser size={22} />Funcionários</MenuLateralItem>
                  </Nav.Link>
                  <Nav.Link onClick={singOut} className="d-none d-md-block d-lg-none">
                    <MenuLateralItem><BiUser size={22} />Sair</MenuLateralItem>
                  </Nav.Link>
                </div>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </NavMenu>

      </Row>
      <Row>
        <Col sm={2} className="my-3 mx-4 d-none d-lg-block">
          <DashboardContent className="ps-sm-1 pt-sm-4 pb-sm-4  p-xl-4  d-flex justify-content-between flex-column ">
            <div>
              <Link to='/'>
                <MenuLateralItem><BiBuildings size={22} />Filiais</MenuLateralItem>
              </Link>
              <Link to='/employees'>
                <MenuLateralItem><BiUser size={22} />Funcionários</MenuLateralItem>
              </Link>
            </div>
            <MenuLateralExit onClick={singOut}><BiExit size={22}></BiExit>Sair</MenuLateralExit>

          </DashboardContent>
        </Col>
        <Col className="my-3 mx-4">
          <DashboardContent usePadding={true}>

            {children}
          </DashboardContent>
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;