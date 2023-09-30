import React,{PropsWithChildren} from 'react';
import Header from './header'; 
import Footer from './footer'; 
import Head from './head';
import SideRecent from './side-recent';
import SideCategories from './side-categories';
import SideTags from './side-tags';
import 'katex/dist/katex.min.css';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <Head/>
      
      <body>
        <Header />
        
        <main className="main-wrapper">
          <div className="main">
            { children }
          </div>
          
          <div className="side">
          <SideRecent/>
          <SideCategories/>
          <SideTags/>
          </div>
        </main>
        
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
