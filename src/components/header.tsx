import React from 'react';
import { Link } from 'gatsby';

const Header: React.FC = () => {
  // .Site.Menus.main에 해당하는 데이터. 실제로는 이 데이터를 동적으로 가져와야 합니다.
  const mainMenus = [
    { name: 'Home', url: '/', children: [] },
    { name: 'Blog', url: '/blog', children: [] },
    {
      name: 'Dropdown',
      url: '#',
      children: [
        { name: 'Submenu1', url: '/submenu1' },
        { name: 'Submenu2', url: '/submenu2' },
      ],
    },
  ];

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link className="site-title" to="/"> {/* .Site.BaseURL에 해당하는 경로로 수정하세요. */}
          Site Title {/* .Site.Title에 해당하는 값으로 수정하세요. */}
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
