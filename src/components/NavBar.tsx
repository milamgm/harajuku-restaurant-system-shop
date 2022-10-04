import { Button, Container, Navbar, Nav, Alert, Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import items from "../data/items.json";
import CartWidget from "./CartWidget/CartWidget";
import { HashLink as Link } from "react-router-hash-link";

const NavBar = () => {
  const it = [];
  items.map((item) => it.push(item.type));
  const itemsType = new Set(it);
  return (
    <>
      <Navbar sticky="top" className="bg-white shadow-sm mb-3">
        <Container className="d-flex aligns-items-center justify-content-center">
          <Nav>
            {[...itemsType].map((item) => (
              <Nav.Link
                as={Link}
                key={item}
                to={{ pathname: "/", hash: `#${item}` }}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
