import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { CommonModule } from '@angular/common';
import { TabNavigationComponent } from '../../shared/components/tab-navigation/tab-navigation.component';
import {
  PlanCardComponent,
  CaracteristicaPlan,
  ComplementoPlan,
} from '../../shared/components/plan-card/plan-card.component';
import { TipoPlan, PESTANAS_PLAN } from '../../shared/interfaces/plans.interface';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [AnimateOnScrollDirective, CommonModule, TabNavigationComponent, PlanCardComponent],
  templateUrl: './plans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansComponent {
  readonly PESTANAS_PLAN = PESTANAS_PLAN;
  planActivo = signal<TipoPlan>('Individual');

  caracteristicasPlanGratis: CaracteristicaPlan[] = [
    { texto: 'Con anuncios', destacada: true },
    { texto: 'Gestión de expedientes básicos' },
    { texto: 'Agenda simple para citas' },
  ];

  complementosPlanGratis: ComplementoPlan[] = [];

  caracteristicasPlanIndividual: CaracteristicaPlan[] = [
    { texto: 'Sin anuncios - Experiencia premium', destacada: true },
    { texto: 'Agenda para gestión de pacientes' },
    { texto: 'Generación de recetas médicas' },
    { texto: 'Historial clínico completo' },
    { texto: 'Recordatorios automáticos' },
    { texto: 'Soporte técnico incluido' },
  ];

  complementosPlanIndividual: ComplementoPlan[] = [
    { texto: 'POS Farmacia', precio: 30, tipoIcono: 'farmacia' },
    { texto: 'Chat interno de la clínica', precio: 25, tipoIcono: 'chat-interno' },
    { texto: 'Chat con los pacientes', precio: 20, tipoIcono: 'chat' },
  ];

  caracteristicasClinicaPequena: CaracteristicaPlan[] = [
    { texto: 'Sin anuncios - Experiencia premium', destacada: true },
    { texto: 'Chat Doctor-Paciente' },
    { texto: 'Gestión de inventario' },
    { texto: 'Control de finanzas' },
    { texto: 'Recetas y expedientes' },
    { texto: 'Gestión de agenda' },
    { texto: 'Administración de equipo' },
  ];

  complementosClinicaPequena: ComplementoPlan[] = [
    { texto: 'POS Farmacia', precio: 40, tipoIcono: 'farmacia' },
    { texto: 'Chat interno de la clínica', precio: 35, tipoIcono: 'chat-interno' },
    { texto: 'Chat con los pacientes', precio: 30, tipoIcono: 'chat' },
  ];

  caracteristicasClinicaMediana: CaracteristicaPlan[] = [
    { texto: 'Sin anuncios - Experiencia premium', destacada: true },
    { texto: 'Todo del plan Pequeña' },
    { texto: 'Gestión avanzada de pacientes' },
    { texto: 'Expedientes digitales completos' },
    { texto: 'Búsqueda de clínica en app' },
    { texto: 'Perfil con ubicación (Google Maps)' },
    { texto: 'Sistema de reseñas' },
    { texto: 'Reportes analíticos' },
  ];

  complementosClinicaMediana: ComplementoPlan[] = [
    { texto: 'POS Farmacia', precio: 50, tipoIcono: 'farmacia' },
    { texto: 'Chat interno de la clínica', precio: 45, tipoIcono: 'chat-interno' },
    { texto: 'Chat con los pacientes', precio: 40, tipoIcono: 'chat' },
  ];

  caracteristicasClinicaGrande: CaracteristicaPlan[] = [
    { texto: 'Sin anuncios - Experiencia premium', destacada: true },
    { texto: 'Todo del plan Mediana' },
    { texto: 'Múltiples especialidades' },
    { texto: 'Gestión multi-sede' },
    { texto: 'Servicios destacados en búsqueda' },
    { texto: 'API personalizada' },
    { texto: 'Capacitación del equipo' },
    { texto: 'Soporte prioritario 24/7' },
  ];

  complementosClinicaGrande: ComplementoPlan[] = [
    { texto: 'POS Farmacia', precio: 60, tipoIcono: 'farmacia' },
    { texto: 'Chat interno de la clínica', precio: 55, tipoIcono: 'chat-interno' },
    { texto: 'Chat con los pacientes', precio: 50, tipoIcono: 'chat' },
  ];

  caracteristicasEnterprise: CaracteristicaPlan[] = [
    { texto: 'Sin anuncios - Experiencia premium', destacada: true },
    { texto: 'Configuración 100% personalizada' },
    { texto: 'Integración con sistemas existentes' },
    { texto: 'Infraestructura dedicada' },
    { texto: 'SLA garantizado' },
    { texto: 'Gestor de cuenta dedicado' },
    { texto: 'Desarrollo de funciones a medida' },
    { texto: 'Consultoría estratégica' },
  ];

  complementosEnterprise: ComplementoPlan[] = [
    { texto: 'Todos los complementos incluidos', precio: 0, tipoIcono: 'incluido' },
    { texto: 'Desarrollo personalizado', precio: 0, tipoIcono: 'desarrollo' },
    { texto: 'Soporte 24/7 dedicado', precio: 0, tipoIcono: 'soporte' },
  ];

  alCambiarPlan(plan: TipoPlan | string): void {
    this.planActivo.set(plan as TipoPlan);
  }
}

