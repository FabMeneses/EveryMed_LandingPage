import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Es EveryMed adecuado para médicos individuales?",
      answer:
        "¡Absolutamente! EveryMed está diseñado para escalar desde médicos independientes hasta grandes centros médicos. Nuestro plan Individual es perfecto para profesionales que trabajan de forma independiente.",
    },
    {
      question: "¿Cómo protegen mis datos de pacientes?",
      answer:
        "Utilizamos encriptación de nivel hospitalario y cumplimos con todos los estándares HIPAA. Tus datos están almacenados en servidores seguros con respaldo continuo y múltiples capas de protección.",
    },
    {
      question: "¿Puedo acceder desde mi móvil o tablet?",
      answer:
        "Sí, EveryMed es completamente responsive y funciona perfectamente en cualquier dispositivo. Puedes acceder desde tu computadora, tablet o smartphone con la misma experiencia de usuario.",
    },
    {
      question: "¿Ofrecen capacitación para mi equipo?",
      answer:
        "Incluimos capacitación personalizada con todos nuestros planes. Nuestro equipo te acompañará en la implementación y se asegurará de que tú y tu equipo dominen la plataforma.",
    },
    {
      question: "¿Puedo migrar mis datos actuales?",
      answer:
        "Sí, ofrecemos migración de datos sin costo adicional. Nuestro equipo técnico te ayudará a transferir toda tu información desde tu sistema actual a EveryMed de forma segura.",
    },
    {
      question: "¿Qué pasa si necesito cancelar mi suscripción?",
      answer:
        "Puedes cancelar en cualquier momento sin penalización. Todos tus datos permanecerán disponibles para exportación durante 90 días después de la cancelación.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
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
              Preguntas Frecuentes
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ¿Tienes preguntas? Tenemos respuestas
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Resolvemos las dudas más comunes sobre EveryMed
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-accent/50"
              >
                <span className="text-foreground pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="text-primary" size={20} />
                  ) : (
                    <Plus className="text-muted-foreground" size={20} />
                  )}
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-muted-foreground">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <motion.button
            className="text-primary hover:underline inline-flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Contáctanos directamente →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
