import React, { useEffect } from 'react';
import cookie from 'js-cookie';

function UtmSourceCookie() {
  useEffect(() => {
    // Check if the utm_source cookie is already set
    const utmSourceCookie = cookie.get('utm_source');
    cookie.set('landingurl', window.location.href, { expires: 30 });
    // If the utm_source cookie is not set, read the value of the utm_source parameter from the URL
    if (!utmSourceCookie) {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');

      // If the utm_source parameter exists, set a cookie with its value
      if (utmSource) {
        cookie.set('utm_source', utmSource, { expires: 30 });
      }
    }
    else{
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');

      // If the utm_source parameter exists, set a cookie with its value
      if (utmSource) {
        cookie.set('utm_source_current', utmSource, { expires: 30 });
      }
    }
}, []);

}

export default UtmSourceCookie;    