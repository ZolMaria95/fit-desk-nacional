import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { AdminApiService, Equipo } from './admin-api.service';

interface DialogData {
  equipos: Equipo[];
  /** helpdesk_client_id de los clientes ya dados de alta (para no ofrecerlos). */
  yaRegistrados: string[];
}

/**
 * Modal para dar de alta un cliente de una región. Toma el cliente del catálogo del
 * HelpDesk (autocompleta nombre + id + slug) y se asigna a un equipo responsable
 * (de ahí sale su regional). Solo se usa desde Administración (modo Quarkus).
 */
@Component({
  selector: 'app-crear-cliente-dialog',
  imports: [
    FormsModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
  ],
  templateUrl: './crear-cliente-dialog.html',
  styleUrl: './administracion.scss',
})
export class CrearClienteDialog {
  private readonly api = inject(AdminApiService);
  private readonly hd = inject(HelpdeskService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<CrearClienteDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly equipos = this.data.equipos;
  readonly hdClientes = this.hd.clients;
  readonly hdBuscar = signal('');
  readonly guardando = signal(false);

  readonly hdFiltrados = computed(() => {
    const t = this.hdBuscar().trim().toLowerCase();
    const ya = new Set(this.data.yaRegistrados.map((x) => String(x)));
    const libres = this.hdClientes().filter((c) => !ya.has(String(c.id)));
    return t ? libres.filter((c) => c.name.toLowerCase().includes(t) || String(c.id).includes(t)) : libres;
  });

  form = { codigo: '', nombre: '', equipoResponsableId: null as number | null, helpdeskClientId: '', color: '' };

  /** Paleta de colores para elegir sin conocer el hexadecimal (+ selector personalizado). */
  readonly palette = [
    '#E74C3C', '#E67E22', '#F2811D', '#F1C40F', '#27AE60', '#16A085',
    '#1ABC9C', '#2980B9', '#04BAF0', '#3498DB', '#9B59B6', '#8E44AD',
    '#D35400', '#C0392B', '#2C3E50', '#7F8C8D',
  ];

  constructor() {
    this.hd.getClients();
  }

  elegirColor(c: string): void {
    this.form.color = c;
  }

  mismoColor(a: string, b: string): boolean {
    return !!a && !!b && a.toLowerCase() === b.toLowerCase();
  }

  elegirHdCliente(id: string): void {
    const c = this.hdClientes().find((x) => String(x.id) === String(id));
    if (!c) return;
    this.form.helpdeskClientId = String(c.id);
    this.form.nombre = c.name;
    if (!this.form.codigo.trim()) {
      this.form.codigo = c.name.trim().toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
    }
  }

  async crear(): Promise<void> {
    const { codigo, nombre, equipoResponsableId, helpdeskClientId, color } = this.form;
    if (!codigo.trim() || !nombre.trim() || !equipoResponsableId) {
      this.snack.open('Completá código, nombre y equipo responsable.', 'OK', { duration: 3500 });
      return;
    }
    this.guardando.set(true);
    try {
      const creado = await this.api.crearCliente({
        codigo: codigo.trim().toLowerCase(),
        nombre: nombre.trim(),
        equipoResponsableId,
        helpdeskClientId: helpdeskClientId.trim() || undefined,
        color: color.trim() || undefined,
      });
      this.ref.close(creado);
    } catch (err) {
      const detalle = (err as { error?: { error?: string } })?.error?.error;
      this.snack.open(detalle ? `No se pudo crear el cliente. ${detalle}` : 'No se pudo crear el cliente.', 'OK', { duration: 4000 });
    } finally {
      this.guardando.set(false);
    }
  }

  cancelar(): void {
    this.ref.close();
  }
}
