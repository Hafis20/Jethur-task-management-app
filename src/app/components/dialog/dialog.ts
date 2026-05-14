import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
})
export class Dialog {
  // Inputs
  public title = input.required<string>()
  // Output events
  public closeDialogEvent = output<void>();

  onClose() {
    this.closeDialogEvent.emit();
  }
}
