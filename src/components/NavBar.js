/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Image from 'next/image';
import { Button } from '@mui/material';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="bg-var(--background-color)" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Image alt="" src="/images/Nav-Logo.jpg" width="30" height="30" className="d-inline-block align-top rounded-xl" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link mx-2" href="/">
              Home
            </Link>
            <Link className="nav-link mx-2" href="/tours">
              Tours
            </Link>
            <Link className="nav-link mx-2" href="/locations">
              Locations
            </Link>
            <Link className="nav-link mx-2" href="/itinerary">
              Your Itinerary
            </Link>
            <Link className="nav-link mx-2" href="/profile">
              Profile
            </Link>
            <Button className="nav-link mx-2 text-white border-transparent hover:border-white" variant="outlined" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
