import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../directives/animate-on-scroll.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [AnimateOnScrollDirective, CommonModule],
  templateUrl: './equipo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipoComponent {
  company = {
    name: 'EverySoftware',
    description: 'Empresa especializada en desarrollo de software médico y soluciones tecnológicas para todo sector.'
  };

  teamMembers = [
    {
      name: 'Fabricio Meneses Avila',
      role: 'Desarrollador Full Stack',
      description: 'Desarrollador Web Full Stack y Diseñador de Interfaces. Especializado en crear experiencias digitales atractivas y funcionales. Más de 1 año de experiencia en desarrollo web y móvil, con enfoque en Angular 20, .NET 9, Clean Architecture y PWA.',
      github: 'https://github.com/FabMeneses',
      portfolio: 'https://fab-portfolio.vercel.app/',
      avatar: 'FM'
    },
    {
      name: 'Alan Javier Sanchez Sanchez',
      role: 'Desarrollador',
      description: 'Desarrollador especializado en tecnologías modernas. Apasionado por crear soluciones innovadoras y eficientes.',
      github: 'https://github.com/Alan222805',
      portfolio: '',
      avatar: 'AS'
    }
  ];
}

