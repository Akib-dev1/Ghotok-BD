import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <Card className="bg-white shadow-md border border-gray-200 hover:shadow-lg transition">
      <CardContent className="flex flex-col items-center text-center p-6 gap-4">
        {icon}
        <h3 className="text-xl font-semibold text-[#D33454]">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
