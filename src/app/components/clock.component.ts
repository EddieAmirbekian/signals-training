import { DatePipe } from '@angular/common';
import { Component } from "@angular/core";

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="clock">
      <!-- {{clock() | date : 'H:mm:ss'}} -->
    </div>
  `,
  styles: `
    .clock {
      font-size: 172px;
      width: 50%;
      margin: auto;
    }
  `
})
export class ClockComponent {
}
