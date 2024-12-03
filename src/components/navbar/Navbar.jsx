import { Link, NavLink } from "react-router-dom";
import "./navbar.scss";

const pages = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/categories?name=Asian",
    name: "Categories",
  },
  {
    path: "/basket",
    name: "Cart",
  },
];

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="container">
          <Link to="/" className="nav__logo">
            Recipes
          </Link>
          <div className="nav__menu">
            <ul className="nav__list">
              {pages.map((item) => (
                <li className="nav__item" key={item.name}>
                  <NavLink to={item.path} className="nav__link">
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
