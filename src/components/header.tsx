import React from 'react';
import { Link } from 'gatsby';

const Header: React.FC = () => {
  const mainMenus = [
    { name: 'Home', url: '/', children: [] },
    // { name: 'About', url: '/about', children: [] },
  ];

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link className="site-title" to="/"> {}
          RedMage {}
        </Link>

        <nav className="menu">
          {mainMenus.map((menu) => (
            <div className="menu-item" key={menu.name}>
              {menu.children.length === 0 ? (
                <Link to={menu.url}>{menu.name}</Link>
              ) : (
                <>
                  <span>{menu.name}↓</span>
                  <nav className="sub-menu">
                    {menu.children.map((submenu) => (
                      <div className="menu-item" key={submenu.name}>
                        <Link to={submenu.url}>{submenu.name}</Link>
                      </div>
                    ))}
                  </nav>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
