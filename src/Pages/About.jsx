import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaShieldAlt, FaHeart, FaUsers, FaHandshake } from "react-icons/fa";
import FeatureCard from "@/Components/ReUsable Components/FeatureCard";

const About = () => {
  return (
    <section className="bg-[#FFF3F5] dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-100 py-16 px-4 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 transition-colors duration-500">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#D33454] dark:text-[#FF5C7A] great-vibes transition-colors duration-500">
            Welcome to GhotokBD
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto prociono transition-colors duration-500">
            Ghotok BD is a culturally grounded and tech-driven matrimony
            platform helping Bangladeshi individuals and families find
            meaningful, lasting connections. Rooted in trust, driven by care.
          </p>
        </div>

        {/* Mission Card */}
        <Card className="bg-white dark:bg-[#2A2A2A] shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl transform hover:-translate-y-1 duration-300 transition-colors">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-3xl font-semibold text-[#D33454] dark:text-[#FF5C7A] transition-colors duration-500">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg prociono transition-colors duration-500">
              To empower families and individuals to build lasting bonds, while
              preserving tradition and privacy in a safe digital space. We
              believe in thoughtful matchmaking — not just swipes.
            </p>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={
              <FaShieldAlt className="text-4xl text-[#D33454] dark:text-[#FF5C7A] transition-colors duration-500" />
            }
            title="Secure & Verified"
            desc="Profiles go through identity checks for peace of mind."
            className="hover:shadow-xl transition-shadow duration-300"
          />
          <FeatureCard
            icon={
              <FaHeart className="text-4xl text-[#D33454] dark:text-[#FF5C7A] transition-colors duration-500" />
            }
            title="Culturally Aligned"
            desc="Respectful, family-first matchmaking experience."
            className="hover:shadow-xl transition-shadow duration-300"
          />
          <FeatureCard
            icon={
              <FaUsers className="text-4xl text-[#D33454] dark:text-[#FF5C7A] transition-colors duration-500" />
            }
            title="Smart Matching"
            desc="Connect based on preferences, interests, and values."
            className="hover:shadow-xl transition-shadow duration-300"
          />
          <FeatureCard
            icon={
              <FaHandshake className="text-4xl text-[#D33454] dark:text-[#FF5C7A] transition-colors duration-500" />
            }
            title="Support Team"
            desc="Real people ready to guide and help you anytime."
            className="hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Commitment Card */}
        <Card className="bg-white dark:bg-[#2A2A2A] shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl transform hover:-translate-y-1 duration-300 transition-colors">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-3xl font-semibold text-[#D33454] dark:text-[#FF5C7A] transition-colors duration-500">
              Our Commitment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg prociono transition-colors duration-500">
              At{" "}
              <span className="font-semibold text-[#D33454] dark:text-[#FF5C7A]">
                GhotokBD
              </span>
              , we don’t just match profiles — we build paths to real
              relationships. Our platform ensures safety, sincerity, and support
              at every step.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
