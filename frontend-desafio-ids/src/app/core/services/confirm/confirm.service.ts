import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export default class ConfirmService {
  private confirmationService = inject(ConfirmationService);

  confirm(options: { event: Event; message: string; icon?: string }) {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        target: options.event.target as EventTarget,
        message: options.message,
        header: 'Atenção',
        closable: true,
        closeOnEscape: true,
        icon: options.icon || 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Prosseguir',
        },
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        },
      });
    });
  }
}
