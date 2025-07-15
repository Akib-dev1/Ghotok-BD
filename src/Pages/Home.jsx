import Banner from "@/Components/ReUsable Components/Banner";
import BiodataList from "@/Components/ReUsable Components/BiodataList";
import HowItWorks from "@/Components/ReUsable Components/HowItWorks";
import React from "react";

const Home = () => {
  return (
    <main>
      <section>
        <Banner />
      </section>
      <section>
        <BiodataList />
      </section>
      <section>
        <HowItWorks />
      </section>
    </main>
  );
};

export default Home;
