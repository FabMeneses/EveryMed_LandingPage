import { Component, input, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CaracteristicaPlan {
  texto: string;
  destacada?: boolean;
}

export type TipoIconoComplemento =
  | 'chat'
  | 'chat-interno'
  | 'farmacia'
  | 'telemedicina'
  | 'reportes'
  | 'integracion'
  | 'recompensas'
  | 'ventas'
  | 'marketing'
  | 'sms'
  | 'laboratorio'
  | 'ia'
  | 'incluido'
  | 'desarrollo'
  | 'soporte';

export interface ComplementoPlan {
  texto: string;
  precio: number;
  tipoIcono?: TipoIconoComplemento;
}

@Component({
  selector: 'app-plan-card',
  imports: [CommonModule],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full h-full',
  },
})
export class PlanCardComponent {
  titulo = input.required<string>();
  subtitulo = input<string>('');
  precioBase = input.required<number>();
  precioTexto = input.required<string>();
  periodo = input<string>('');
  descripcion = input<string>('');
  caracteristicas = input<CaracteristicaPlan[]>([]);
  complementos = input<ComplementoPlan[]>([]);
  esPopular = input<boolean>(false);
  esDestacado = input<boolean>(false);
  textoBoton = input<string>('Próximamente');
  botonDeshabilitado = input<boolean>(true);
  iconoTipo = input<'individual' | 'empresa' | 'pos' | 'premium' | 'gratis'>('individual');

  complementosSeleccionados = signal<Set<number>>(new Set());
  animarEstiramiento = signal<boolean>(false);

  precioTotal = computed(() => {
    const base = this.precioBase();
    const seleccionados = this.complementosSeleccionados();
    const adicional = Array.from(seleccionados).reduce((sum, index) => {
      return sum + (this.complementos()[index]?.precio || 0);
    }, 0);
    return base + adicional;
  });

  precioFormateado = computed(() => {
    const precioTextoValue = this.precioTexto();
    if (precioTextoValue.includes('Personalizado')) return 'Personalizado';

    const total = this.precioTotal();
    if (total === 0) return 'Gratis';

    return `$${total.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  });

  toggleComplemento(index: number): void {
    const seleccionados = new Set(this.complementosSeleccionados());
    if (seleccionados.has(index)) {
      seleccionados.delete(index);
    } else {
      seleccionados.add(index);
    }
    this.complementosSeleccionados.set(seleccionados);
    
    // Activar animación de estiramiento
    this.animarEstiramiento.set(true);
    setTimeout(() => {
      this.animarEstiramiento.set(false);
    }, 400);
  }

  estaSeleccionado(index: number): boolean {
    return this.complementosSeleccionados().has(index);
  }
}

