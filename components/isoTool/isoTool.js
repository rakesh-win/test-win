import React from "react";

function isoTool() {
  return (
    <div>
      <div className="isotool__container">
        <div className="iso-text isotool__heading">
          <p>Certification Fees</p>
        </div>
        <div className="isotool__main">
          <div className="isotool_valueslist">
            <div className="isocalculator__values">
              <p
                style={{
                  fontSize: "16px",
                  color: " #052f5f",
                  fontFamily: "Open Sans ,sans-serif",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Total Cost for Certification:
              </p>
              <p
                style={{
                  color: "#1b1dc7",
                  fontSize: "25px",
                  // left: "20px",
                  // position: "relative",
                  fontWeight: 500,
                  textAlign: "center",
                  fontFamily: "sans-serif",
                }}
              >
                {/* ₹2,000 */}
              </p>
              <div className="isocalculator-btn">
                <button onClick={handleFormSubmit}>Know more</button>
              </div>
              <div className="isocalculator__values"></div>
              <label style={{ textAlign: "center" }}>
                Note: Lorem ipsum dolor sit amet consectetur adipisicing elit
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default isoTool;

