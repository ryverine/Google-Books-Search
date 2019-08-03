import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books Search
      </a>
      <a className="navbar-brand" href="/saved">
        Your saved books
      </a>
    </nav>
  );
}

export default Nav;
