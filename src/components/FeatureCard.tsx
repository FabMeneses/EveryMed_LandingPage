import React, { useState } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-4 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Icon */}
      <div className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#5a5c8c]">
        {description}
      </p>
    </div>
  );
}