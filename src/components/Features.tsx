import React from "react";
import { FileText, Calendar, Users, Shield, Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function Features() {
  const features = [
    {
      icon: FileText,
      title: "Historiales Clínicos Digitales",
      description: "Gestiona y accede a los registros médicos completos de tus pacientes de forma segura y organizada."
    },
    {
      icon: Calendar,
      title: "Sistema de Citas Inteligente",
      description: "Agenda, gestiona y sincroniza citas para todo tu equipo médico con recordatorios automáticos."
    },
    {
      icon: Users,
      title: "Gestión de Equipo Médico",
      description: "Administra roles, permisos y actividades de tu personal médico desde un panel centralizado."
    },
    {
      icon: Shield,
      title: "Seguridad de Datos",
      description: "Cumplimiento HIPAA con encriptación de nivel hospitalario para proteger información sensible."
    },
    {
      icon: Clock,
      title: "Acceso Multi-dispositivo",
      description: "Accede desde cualquier lugar y dispositivo. Sincronización en tiempo real para todo tu equipo."
    },
    {
      icon: TrendingUp,
      title: "Reportes y Analíticas",
      description: "Estadísticas detalladas, métricas de rendimiento y reportes personalizables para tu práctica."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="servicios" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full">
              Características Principales
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Todo lo que necesitas para gestionar tu práctica
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Herramientas profesionales diseñadas para médicos, clínicas y centros de salud modernos
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl bg-card relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <motion.div 
                  className="relative w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="text-foreground group-hover:text-primary-foreground transition-colors" size={24} />
                </motion.div>
                <h3 className="text-foreground mb-2 relative">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground relative">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
