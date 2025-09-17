import React from "react";
import Link from "next/link";

const PageBanner = ({
  pageTitle,
  homePageUrl,
  homePageText,
  activePageText,
}) => {
  return (
    <div className="page-title-area">
      <div className="container">
        <div className="shape9"></div>
        <div className="page-title-content">
          <ul>
            <li>
              {typeof homePageUrl === "string" ? (
                <Link href={homePageUrl}>
                  <a>{homePageText}</a>
                </Link>
              ) : (
                <button
                  onClick={homePageUrl}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {homePageText}
                </button>
              )}
            </li>
            <li className="active">{activePageText}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
