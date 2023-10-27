import React from 'react';
import { Link } from 'gatsby';

const Footer: React.FC = () => {
  const sections = [
    { name: 'Section1', rssUrl: '/rss-section1' },
    { name: 'Section2', rssUrl: '/rss-section2' },
  ];

  const footerRows = [
    {
      items: [
        { pre: '<strong>Pre Item</strong>', url: '#', name: 'Item1' },
        { url: '/item2', name: 'Item2' }, 
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-row">
        Copyright 2023 ©<Link to="https://github.com/skeep194">skeep194</Link>, built with&nbsp;<Link to="https://github.com/kasterra">kasterra</Link>
      </div>
      <div className="footer-row">
        from&nbsp;<Link to="https://github.com/leafee98/hugo-theme-flat">hugo-theme-flat</Link>&nbsp;migrate gatsby
      </div>
    </footer>
  );
};

export default Footer;
