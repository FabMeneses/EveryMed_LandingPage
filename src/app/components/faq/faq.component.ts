import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AnimateOnScrollDirective, CommonModule],
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FAQComponent {
  openIndex = signal<number | null>(0);

  readonly faqs: readonly FAQ[] = [
    {
      question: '¿Es EveryMed adecuado para médicos individuales?',
      answer: '¡Absolutamente! EveryMed está diseñado para escalar desde médicos independientes hasta grandes centros médicos. Nuestro plan Individual es perfecto para profesionales que trabajan de forma independiente.'
    },
    {
      question: '¿Cómo protegen mis datos de pacientes?',
      answer: 'Utilizamos encriptación de nivel hospitalario y cumplimos con todos los estándares HIPAA. Tus datos están almacenados en servidores seguros con respaldo continuo y múltiples capas de protección.'
    },
    {
      question: '¿Puedo acceder desde mi móvil o tablet?',
      answer: 'Sí, EveryMed es completamente responsive y funciona perfectamente en cualquier dispositivo. Puedes acceder desde tu computadora, tablet o smartphone con la misma experiencia de usuario.'
    },
    {
      question: '¿Ofrecen capacitación para mi equipo?',
      answer: 'Incluimos capacitación personalizada con todos nuestros planes. Nuestro equipo te acompañará en la implementación y se asegurará de que tú y tu equipo dominen la plataforma.'
    },
    {
      question: '¿Puedo migrar mis datos actuales?',
      answer: 'Sí, ofrecemos migración de datos sin costo adicional. Nuestro equipo técnico te ayudará a transferir toda tu información desde tu sistema actual a EveryMed de forma segura.'
    },
    {
      question: '¿Qué pasa si necesito cancelar mi suscripción?',
      answer: 'Puedes cancelar en cualquier momento sin penalización. Todos tus datos permanecerán disponibles para exportación durante 90 días después de la cancelación.'
    }
  ];

  toggleFAQ(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}

