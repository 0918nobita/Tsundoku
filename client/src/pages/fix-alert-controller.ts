import { HostListener } from '@angular/core';

export class FixAlertController {
  protected conversion = false;

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    /* tslint:disable:deprecation */
    if (event.keyCode === 229) this.conversion = true;
    else if (event.keyCode === 13) this.conversion = false;
  }
}
