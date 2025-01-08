import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeSwitch from "./themeToggle";
import logo from "@/assets/main-logo.png";
import { Link } from "@/interfaces/interfaces";

const links: Link[] = [
  { to: "/Main", label: "Main" },
  { to: "/Search", label: "Search" },
  { to: "/Favorites", label: "Favorites" },
  { to: "/Top100", label: "Top 100" },
];

export default function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const toMainPage = (): void => {
    navigate("/main");
  };

  return (
    <nav className="navigation-menu">
      <ThemeSwitch />

      {/* Logo */}
      <div className="logo-container" onClick={toMainPage}>
        <img src={logo} alt="Crypto Tracker logo" className="logo-img" />
        <h3 className="logo-text">CRYPTO TRACKER</h3>
      </div>

      {/* Burger Icon for Mobile */}
      <div className="menu__icon" onClick={toggleMenu}>
        <span className="burger-span"></span>
        <span className="burger-span"></span>
        <span className="burger-span"></span>
      </div>

      {/* Menu List */}
      <ul className={`menu__list ${isMenuOpen ? "active" : ""}`}>
        {links.map(({ to, label }) => (
          <li key={to} className="menu" onClick={toggleMenu}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? "active navigation-link" : "navigation-link"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
