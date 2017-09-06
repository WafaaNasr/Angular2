import { ErrorHandler } from '@angular/core/core';

export class AppErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    alert('An expected error occured..');
    console.log(error);
  }
}
