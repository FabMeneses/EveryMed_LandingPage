import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function CTA() {
  const benefits = [
    "Acceso anticipado disponible próximamente",
    "Implementación y capacitación incluidas",
    "Soporte técnico especializado",
    "Migración de datos sin costo",
  ];

  return (
    <section id="contacto" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          <div className="relative z-10 text-center space-y-6">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              ¿Listo para modernizar tu práctica médica?
            </motion.h2>

            <motion.p
              className="text-primary-foreground/90 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Únete a más de 150 clínicas y 2,000 profesionales de la salud que
              confían en EveryMed
            </motion.p>

            {/* Benefits */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto py-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-primary-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.button
                className="group bg-white text-primary px-10 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Próximamente
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.button>
            </motion.div>

            <motion.p
              className="text-primary-foreground/70 text-sm pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Sin compromiso - Conoce la plataforma antes de decidir
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
