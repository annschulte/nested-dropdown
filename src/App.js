import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useVirtual } from "react-virtual";

const App = () => {
  return (
    <Navbar>
      <NavItem icon={"🐸"}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
};

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
};

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const { virtualItems, totalSize } = useVirtual({
    size: 20,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 52, [])
  });

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropdownItem = (props) => {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.children}
      </a>
    );
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div
          className="menu"
          ref={listRef}
          style={{
            width: "100%",
            height: "400px",
            overflow: "auto"
          }}
        >
          <div
            style={{
              height: totalSize,
              width: "100%",
              position: "relative"
            }}
          >
            {virtualItems.map((row) => (
              <>
                <DropdownItem goToMenu="Journey One">Journey One</DropdownItem>
                <DropdownItem goToMenu="Journey Two">Journey Two</DropdownItem>
                <DropdownItem goToMenu="Journey Three">
                  Journey Three
                </DropdownItem>
              </>
            ))}
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "Journey One"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main"> {"<-"} Back to Journeys</DropdownItem>
          <DropdownItem>Journey One Engage 1</DropdownItem>
          <DropdownItem>Journey One Engage 2</DropdownItem>
          <DropdownItem>Journey One Engage 3</DropdownItem>
          <DropdownItem>Journey One Engage 4</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "Journey Two"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main"> {"<-"} Back to Journeys</DropdownItem>
          <DropdownItem>Journey Two Engage 1</DropdownItem>
          <DropdownItem>Journey Two Engage 2</DropdownItem>
          <DropdownItem>Journey Two Engage 3</DropdownItem>
          <DropdownItem>Journey Two Engage 4</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "Journey Three"}
        timeout={300}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main"> {"<-"} Back to Journeys</DropdownItem>
          <DropdownItem>Journey Three Engage 1</DropdownItem>
          <DropdownItem>Journey Three Engage 2</DropdownItem>
          <DropdownItem>Journey Three Engage 3</DropdownItem>
          <DropdownItem>Journey Three Engage 4</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default App;
