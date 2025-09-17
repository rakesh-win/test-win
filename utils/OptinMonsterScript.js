import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function OptinMonsterScript() {
   const router =useRouter();
  const isViewCoursePage = router.pathname === "/calculator/isocalculator";
  // Conditionally render the navbar component
  if (isViewCoursePage) return null;
  
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://a.omappapi.com/app/js/api.min.js';
    script.async = true;
    script.dataset.user = '169501';
    script.dataset.account = '183767';
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  return null;
}

export default OptinMonsterScript;
