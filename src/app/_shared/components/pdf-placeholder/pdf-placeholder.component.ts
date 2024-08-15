import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-placeholder',
  templateUrl: './pdf-placeholder.component.html',
})
export class PdfPlaceholderComponent {
  @Input() width: any = 144;
  @Input() height: any = 206;
}
