import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";


export function FeatureBanner() {
  const features = [
    "Sin contrato a largo plazo",
    "Prueba gratuita de 14 días",
    "Soporte en español 24/7",
    "Actualizaciones incluidas"
  ];

  return (
    <motion.div 
      className="bg-gradient-to-r from-primary via-secondary to-primary py-3 px-4 overflow-hidden relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center justify-center gap-8 text-primary-foreground"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...features, ...features].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 whitespace-nowrap">
              <Sparkles size={16} className="flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent pointer-events-none"></div>
    </motion.div>
  );
}
