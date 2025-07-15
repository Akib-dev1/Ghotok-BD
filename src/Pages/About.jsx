import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaShieldAlt, FaHeart, FaUsers, FaHandshake } from "react-icons/fa";
import FeatureCard from "@/Components/ReUsable Components/FeatureCard";

const About = () => {
  return (
    <section className="bg-[#FFF3F5] text-gray-800 py-16 px-4 ">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#D33454] mb-2 great-vibes">
            Welcome to GhotokBD
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto prociono">
            Ghotok BD is a culturally grounded and tech-driven matrimony
            platform helping Bangladeshi individuals and families find
            meaningful, lasting connections. Rooted in trust, driven by care.
          </p>
        </div>

        {/* Mission Card */}
        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-8 space-y-3">
            <h2 className="text-3xl font-semibold text-[#D33454]">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg prociono">
              To empower families and individuals to build lasting bonds, while
              preserving tradition and privacy in a safe digital space. We
              believe in thoughtful matchmaking — not just swipes.
            </p>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FaShieldAlt className="text-4xl text-[#D33454]" />}
            title="Secure & Verified"
            desc="Profiles go through identity checks for peace of mind."
          />
          <FeatureCard
            icon={<FaHeart className="text-4xl text-[#D33454]" />}
            title="Culturally Aligned"
            desc="Respectful, family-first matchmaking experience."
          />
          <FeatureCard
            icon={<FaUsers className="text-4xl text-[#D33454]" />}
            title="Smart Matching"
            desc="Connect based on preferences, interests, and values."
          />
          <FeatureCard
            icon={<FaHandshake className="text-4xl text-[#D33454]" />}
            title="Support Team"
            desc="Real people ready to guide and help you anytime."
          />
        </div>

        {/* Commitment */}
        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-8 space-y-3">
            <h2 className="text-3xl font-semibold text-[#D33454]">
              Our Commitment
            </h2>
            <p className="text-gray-700 text-lg prociono">
              At <span className="font-semibold text-[#D33454]">GhotokBD</span>
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
