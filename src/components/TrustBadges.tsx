import React from "react";
import { Shield, Award, Heart, Zap } from "lucide-react";
import { motion } from "motion/react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Certificación HIPAA",
      description: "Cumplimiento total",
    },
    {
      icon: Award,
      title: "ISO 27001",
      description: "Seguridad certificada",
    },
    {
      icon: Heart,
      title: "99.9% Uptime",
      description: "Disponibilidad garantizada",
    },
    {
      icon: Zap,
      title: "Soporte 24/7",
      description: "Siempre disponibles",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground">
            Confianza y seguridad respaldadas por las mejores certificaciones
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mb-3">
                  <Icon className="text-primary" size={28} />
                </div>
                <h4 className="text-foreground mb-1">{badge.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
