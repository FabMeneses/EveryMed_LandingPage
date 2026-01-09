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
  ];

  caracteristicasPlanPOS: CaracteristicaPlan[] = [
    { texto: 'Sin anuncios - Experiencia premium', destacada: true },
    { texto: 'Gestión de inventario completo' },
    { texto: 'Punto de compra y venta' },
  ];

  complementosPlanPOS: ComplementoPlan[] = [];

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

  complementosEnterprise: ComplementoPlan[] = [];

  alCambiarPlan(plan: TipoPlan | string): void {
    this.planActivo.set(plan as TipoPlan);
  }
}

