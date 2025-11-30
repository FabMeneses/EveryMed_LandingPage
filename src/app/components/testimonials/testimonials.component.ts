import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Dr. José Martínez',
      role: 'Médico Individual',
      rating: 5,
      text: 'Como médico independiente, EveryMed me permite gestionar mi consultorio de forma profesional sin necesidad de un equipo técnico.'
    },
    {
      name: 'Dra. Laura Fernández',
      role: 'Directora - Clínica San Rafael',
      rating: 5,
      text: 'Perfecto para nuestra clínica de 8 médicos. La coordinación entre especialistas y la gestión de pacientes es ahora muy simple.'
    },
    {
      name: 'Dr. Roberto Silva',
      role: 'CTO - Centro Médico Central',
      rating: 5,
      text: 'Gestionamos 3 sedes con más de 50 profesionales. EveryMed escala perfectamente con nuestras necesidades empresariales.'
    }
  ];
}

