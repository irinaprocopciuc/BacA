import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  readonly toastrOptions = {
    positionClass: 'toast-top-right',
    timeOut: 5000,
    enableHtml: true,
  };

  constructor(private readonly toastr: ToastrService) { }

  displaySuccessToast(header: string, message: string): void {
    this.toastr.success(message, header, this.toastrOptions);
  }

  displayInfoToast(header: string, message: string): void {
    this.toastr.info(message, header, this.toastrOptions);
  }

  displayWarningToast(header: string, message: string): void {
    this.toastr.warning(message, header, this.toastrOptions);
  }

  displayErrorToast(header: string, message: string): void {
    this.toastr.error(message, header, this.toastrOptions);
  }
}
