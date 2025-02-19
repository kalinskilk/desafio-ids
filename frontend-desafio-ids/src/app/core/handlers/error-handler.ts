import { ErrorHandler, inject } from '@angular/core';
import { ToastService } from '../services/toast/toast.service';

export class CustomErrorHandler implements ErrorHandler {
  toastService = inject(ToastService);
  handleError(error: any) {
    const msg = typeof error === 'string' ? error : error.message;
    this.toastService.showError(msg);
  }
}
