import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  
  constructor(private toasts: ToastrService) { }

  showSuccess(texto: string, titulo: string){
    this.toasts.success(texto, titulo);
  }

  showError(texto: string, titulo: string){
    this.toasts.error(texto, titulo);
  }
}
