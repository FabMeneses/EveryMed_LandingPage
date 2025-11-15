import React from "react";
import { motion } from "motion/react";
import { Users, Building2, Calendar, FileText } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Building2,
      value: "150+",
      label: "Clínicas activas",
      color: "from-primary to-secondary",
    },
    {
      icon: Users,
      value: "2,000+",
      label: "Médicos profesionales",
      color: "from-secondary to-primary",
    },
    {
      icon: Calendar,
      value: "50K+",
      label: "Citas mensuales",
      color: "from-primary to-secondary",
    },
    {
      icon: FileText,
      value: "100K+",
      label: "Historiales digitales",
      color: "from-secondary to-primary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Números que hablan por sí solos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Miles de profesionales de la salud confían en EveryMed para
            gestionar sus prácticas médicas
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="text-3xl md:text-4xl text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
