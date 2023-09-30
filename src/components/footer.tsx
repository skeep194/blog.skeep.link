import React from 'react';
import { Link } from 'gatsby';

const Footer: React.FC = () => {
  // .Site.Sections에 해당하는 데이터. 실제로는 이 데이터를 동적으로 가져와야 합니다.
  const sections = [
    { name: 'Section1', rssUrl: '/rss-section1' },
    { name: 'Section2', rssUrl: '/rss-section2' },
    // ...
  ];

  // .Site.Params.footer_rows에 해당하는 데이터. 실제로는 이 데이터를 동적으로 가져와야 합니다.
  const footerRows = [
    {
      items: [
        { pre: '<strong>Pre Item</strong>', url: '#', name: 'Item1' },
        { url: '/item2', name: 'Item2' },
        // ...
      ],
    },
    // ...
  ];

  return (
    <footer className="footer">
      <div className="footer-row">
        {sections.map((section) => (
          <Link className="footer-item" key={section.name} to={section.rssUrl}>
            Feed of {section.name} <i className="icofont-rss"></i>
          </Link>
        ))}
      </div>

      {footerRows.map((row, idx) => (
        <div className="footer-row" key={idx}>
          {row.items.map((item, idx) => (
            item.pre ? (
              <span className="footer-item" key={idx} dangerouslySetInnerHTML={{ __html: item.pre }} />
            ) : (
              <Link className="footer-item" key={idx} to={item.url}>
                {item.name}
              </Link>
            )
          ))}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
