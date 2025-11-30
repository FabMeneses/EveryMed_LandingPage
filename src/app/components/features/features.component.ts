import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
  features = [
    {
      iconType: 'document',
      title: 'Historiales Clínicos Digitales',
      description: 'Gestiona y accede a los registros médicos completos de tus pacientes de forma segura y organizada.'
    },
    {
      iconType: 'calendar',
      title: 'Sistema de Citas Inteligente',
      description: 'Agenda, gestiona y sincroniza citas para todo tu equipo médico con recordatorios automáticos.'
    },
    {
      iconType: 'users',
      title: 'Gestión de Equipo Médico',
      description: 'Administra roles, permisos y actividades de tu personal médico desde un panel centralizado.'
    },
    {
      iconType: 'shield',
      title: 'Seguridad de Datos',
      description: 'Cumplimiento HIPAA con encriptación de nivel hospitalario para proteger información sensible.'
    },
    {
      iconType: 'device',
      title: 'Acceso Multi-dispositivo',
      description: 'Accede desde cualquier lugar y dispositivo. Sincronización en tiempo real para todo tu equipo.'
    },
    {
      iconType: 'chart',
      title: 'Reportes y Analíticas',
      description: 'Estadísticas detalladas, métricas de rendimiento y reportes personalizables para tu práctica.'
    }
  ];
}

