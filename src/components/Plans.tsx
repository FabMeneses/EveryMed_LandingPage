import React, { useState } from "react";
import { User, Building, Building2, Users, Check, Sparkles, Gift } from "lucide-react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export function Plans() {
  const [activeTab, setActiveTab] = useState("individual");

  const addOns = [
    { id: "chat", label: "Chat con los pacientes" },
    { id: "pharmacy", label: "Administración de farmacia" },
    { id: "reports", label: "Reportes avanzados" },
    { id: "lab", label: "Integración con laboratorios" },
    { id: "telemedicine", label: "Telemedicina" }
  ];

  const individualPlans = [
    {
      icon: Gift,
      name: "Gratis",
      price: "$0",
      period: "/mes",
      description: "Comienza sin costo",
      features: [
        "Gestión de expedientes básicos",
        "Agenda simple para citas"
      ],
      isFree: true
    },
    {
      icon: User,
      name: "Plan Individual",
      price: "$125.00",
      period: "/mes",
      description: "Perfecto para médicos independientes",
      features: [
        "Agenda para gestión de pacientes",
        "Generación de recetas médicas",
        "Historial clínico completo",
        "Recordatorios automáticos",
        "Soporte técnico incluido"
      ],
      isFree: false
    }
  ];

  const businessPlans = [
    {
      icon: Building,
      name: "Clínica Pequeña",
      users: "2",
      price: "$300",
      period: "/mes",
      description: "Ideal para clínicas en crecimiento",
      features: [
        "Chat Doctor-Paciente",
        "Gestión de inventario",
        "Control de finanzas",
        "Recetas y expedientes",
        "Gestión de agenda",
        "Administración de equipo"
      ],
      popular: false
    },
    {
      icon: Building2,
      name: "Clínica Mediana",
      users: "3-5",
      price: "$600",
      period: "/mes",
      description: "Para clínicas establecidas",
      features: [
        "Todo del plan Pequeña",
        "Gestión avanzada de pacientes",
        "Expedientes digitales completos",
        "Búsqueda de clínica en app",
        "Perfil con ubicación (Google Maps)",
        "Sistema de reseñas",
        "Reportes analíticos"
      ],
      popular: true
    },
    {
      icon: Users,
      name: "Clínica Grande",
      users: "6-10",
      price: "$1,000",
      period: "/mes",
      description: "Para instituciones grandes",
      features: [
        "Todo del plan Mediana",
        "Múltiples especialidades",
        "Gestión multi-sede",
        "Servicios destacados en búsqueda",
        "API personalizada",
        "Capacitación del equipo",
        "Soporte prioritario 24/7"
      ],
      popular: false
    },
    {
      icon: Sparkles,
      name: "Enterprise",
      users: "+10",
      price: "Personalizado",
      period: "",
      description: "Solución personalizada",
      features: [
        "Configuración 100% personalizada",
        "Integración con sistemas existentes",
        "Infraestructura dedicada",
        "SLA garantizado",
        "Gestor de cuenta dedicado",
        "Desarrollo de funciones a medida",
        "Consultoría estratégica"
      ],
      popular: false,
      isCustom: true
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="planes" className="py-16 md:py-24 px-4 bg-background">
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
              Planes y Precios
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Un plan para cada necesidad
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Desde médicos independientes hasta grandes centros de salud, tenemos la solución perfecta para ti
          </motion.p>
        </motion.div>

        {/* Tabs for Individual and Business */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="individual" className="gap-2">
                <User size={18} />
                Individual
              </TabsTrigger>
              <TabsTrigger value="empresa" className="gap-2">
                <Building size={18} />
                Empresa
              </TabsTrigger>
            </TabsList>

            {/* Individual Plans */}
            <TabsContent value="individual">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {individualPlans.map((plan, index) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      key={index}
                      className={`relative p-8 rounded-2xl border-2 shadow-xl ${
                        plan.isFree
                          ? 'border-border bg-card hover:border-primary/50'
                          : 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10'
                      }`}
                      whileHover={{ 
                        y: -10,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {!plan.isFree && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                          Recomendado
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center mb-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                          plan.isFree ? 'bg-accent' : 'bg-primary'
                        }`}>
                          <Icon className={plan.isFree ? 'text-foreground' : 'text-primary-foreground'} size={32} />
                        </div>
                        <h3 className="text-foreground mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {plan.description}
                        </p>
                        <div className="flex items-end gap-1">
                          <span className={`text-4xl ${plan.isFree ? 'text-foreground' : 'text-primary'}`}>
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground mb-1">
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className={`flex-shrink-0 mt-0.5 ${
                              plan.isFree ? 'text-muted-foreground' : 'text-primary'
                            }`} size={20} />
                            <span className="text-foreground text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Add-ons Section */}
                      <div className="mb-6">
                        <Separator className="mb-4" />
                        <h4 className="text-sm text-muted-foreground mb-3">Complementos</h4>
                        <div className="space-y-2.5">
                          {addOns.map((addon) => (
                            <div key={addon.id} className="flex items-center gap-2">
                              <Checkbox id={`${plan.name}-${addon.id}`} />
                              <label
                                htmlFor={`${plan.name}-${addon.id}`}
                                className="text-sm text-foreground cursor-pointer"
                              >
                                {addon.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <motion.a
                        href="https://everymed.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full py-3 rounded-full text-center transition-all ${
                          plan.isFree
                            ? 'bg-accent text-accent-foreground hover:bg-accent/80'
                            : 'bg-primary text-primary-foreground hover:opacity-90'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Próximamente
                      </motion.a>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* Business Plans */}
            <TabsContent value="empresa">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {businessPlans.map((plan, index) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                        plan.popular
                          ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 scale-105'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                      whileHover={{ 
                        y: -10,
                        scale: plan.popular ? 1.05 : 1.03,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                          Más popular
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                          plan.popular ? 'bg-primary' : 'bg-accent'
                        }`}>
                          <Icon className={plan.popular ? 'text-primary-foreground' : 'text-foreground'} size={28} />
                        </div>
                        <h3 className="text-foreground mb-1 text-lg">
                          {plan.name}
                        </h3>
                        <div className={`px-3 py-1 rounded-full mb-3 ${
                          plan.isCustom 
                            ? 'bg-gradient-to-r from-primary to-secondary' 
                            : 'bg-accent'
                        }`}>
                          <span className={`text-sm ${
                            plan.isCustom ? 'text-white' : 'text-foreground'
                          }`}>
                            {plan.users} usuarios
                          </span>
                        </div>
                        <div className="flex items-end gap-1 mb-2">
                          <span className={`text-2xl ${plan.popular ? 'text-primary' : 'text-foreground'}`}>
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-muted-foreground text-sm mb-0.5">
                              {plan.period}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {plan.description}
                        </p>
                      </div>

                      <ul className="space-y-2.5 mb-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className={`flex-shrink-0 mt-0.5 ${
                              plan.popular ? 'text-primary' : 'text-muted-foreground'
                            }`} size={18} />
                            <span className="text-foreground text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Add-ons Section */}
                      <div className="mb-4">
                        <Separator className="mb-3" />
                        <h4 className="text-xs text-muted-foreground mb-2.5">Complementos</h4>
                        <div className="space-y-2">
                          {addOns.slice(0, 3).map((addon) => (
                            <div key={addon.id} className="flex items-center gap-2">
                              <Checkbox id={`${plan.name}-${addon.id}`} />
                              <label
                                htmlFor={`${plan.name}-${addon.id}`}
                                className="text-xs text-foreground cursor-pointer"
                              >
                                {addon.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <motion.a
                        href={plan.isCustom ? '#contacto' : 'https://everymed.com'}
                        target={plan.isCustom ? '_self' : '_blank'}
                        rel={plan.isCustom ? undefined : 'noopener noreferrer'}
                        className={`block w-full py-2.5 rounded-full text-center transition-all text-sm ${
                          plan.popular
                            ? 'bg-primary text-primary-foreground hover:opacity-90'
                            : plan.isCustom
                            ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                            : 'bg-accent text-accent-foreground hover:bg-accent/80'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {plan.isCustom ? 'Contactar Ventas' : 'Próximamente'}
                      </motion.a>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-4">
            ¿Necesitas un plan personalizado para tu institución?
          </p>
          <motion.button 
            className="text-primary hover:underline"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Contacta con nuestro equipo de ventas →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
