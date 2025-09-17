import { useRouter } from "next/router";
import React from "react";
import CookieConsent from "react-cookie-consent";

function CoookieConsents() {
  const router = useRouter();
  const isViewCoursePage = router.pathname === "/calculator/isocalculator";
  // Conditionally render the navbar component
  if (isViewCoursePage) return null;

  return (
    <CookieConsent>
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
}

export default CoookieConsents;