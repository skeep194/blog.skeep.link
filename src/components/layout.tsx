import React,{PropsWithChildren} from 'react';
import Header from './header'; 
import Footer from './footer'; 
import SideRecent from './side-recent';
import SideCategories from './side-categories';
import SideTags from './side-tags';
import 'katex/dist/katex.min.css';
import SEO from './seo';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className='layout-wrapper'>
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
    </div>
  );
};

export default Layout;