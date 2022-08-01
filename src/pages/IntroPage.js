import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Group from "../shared/Group 292.png";

const IntroPage = () => {
  return (
    <>
      <Header />
      <img
        alt=""
        style={{
          marginTop: "80px",
        }}
        src={Group}
      />
      <Footer />
    </>
  );
};

export default IntroPage;
