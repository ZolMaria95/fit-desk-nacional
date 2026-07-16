import { Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { clipboardToHtml, insertCodeBlock } from '../ticket-utils';

export interface ComposeData {
  /** HTML inicial a editar (borrador previo). */
  html?: string;
  /** Texto del encabezado del diálogo. */
  titulo?: string;
}

/**
 * Editor de respuesta en pop-up: área amplia con formato básico
 * (negrita / cursiva / subrayado). Devuelve el HTML editado al cerrar con
 * "Listo", o `undefined` si se cancela.
 */
@Component({
  selector: 'app-compose-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './compose-dialog.html',
  styleUrl: './compose-dialog.scss',
})
export class ComposeDialog {
  private readonly ref = inject(MatDialogRef<ComposeDialog, string>);
  private readonly data = inject<ComposeData>(MAT_DIALOG_DATA);

  readonly titulo = this.data.titulo || 'Redactar respuesta';
  readonly editor = viewChild.required<ElementRef<HTMLElement>>('editor');

  constructor() {
    afterNextRender(() => {
      const el = this.editor().nativeElement;
      el.innerHTML = this.data.html || '';
      el.focus();
      // Cursor al final del contenido existente.
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
  }

  /** Aplica negrita/cursiva/subrayado a la selección sin perder el foco. */
  format(cmd: 'bold' | 'italic' | 'underline'): void {
    this.editor().nativeElement.focus();
    document.execCommand(cmd, false);
  }

  /** Marca la selección como bloque de código (monoespaciado, conserva sangría). */
  codeBlock(): void {
    insertCodeBlock(this.editor().nativeElement);
  }

  /** Al pegar, inserta HTML saneado (conserva formato, descarta ruido del portapapeles). */
  onPaste(e: ClipboardEvent): void {
    const data = e.clipboardData;
    if (!data) return;
    e.preventDefault();
    const limpio = clipboardToHtml(data.getData('text/html'), data.getData('text/plain'));
    document.execCommand('insertHTML', false, limpio);
  }

  done(): void {
    const el = this.editor().nativeElement;
    // Si solo quedó el espacio en blanco, devuelve vacío.
    this.ref.close(el.textContent?.trim() || el.querySelector('img') ? el.innerHTML : '');
  }
}
