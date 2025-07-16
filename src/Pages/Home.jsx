import Banner from "@/Components/ReUsable Components/Banner";
import BiodataList from "@/Components/ReUsable Components/BiodataList";
import HowItWorks from "@/Components/ReUsable Components/HowItWorks";
import SuccessCouter from "@/Components/ReUsable Components/SuccessCouter";
import SuccessStory from "@/Components/ReUsable Components/SuccessStory";
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
      <section>
        <SuccessCouter />
      </section>
      <section>
        <SuccessStory />
      </section>
    </main>
  );
};

export default Home;
