// ScrollToTop.js
import { useEffect, useLocation } from '../import';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when pathname changes
  }, [pathname]);

  return null; // this component doesn't render anything
}

export default ScrollToTop;
