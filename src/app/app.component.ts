import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';

import { ClockComponent, TimerComponent, WorldTimeComponent } from '@/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TabViewModule,
    FormsModule,
    DropdownModule,
    ClockComponent,
    TimerComponent,
    WorldTimeComponent,
  ],
  template: `
    <p-tabView>
      <p-tabPanel header="Clock">
        <app-clock />
      </p-tabPanel>
      <p-tabPanel header="Timer">
        Here must be a timer that allows the user to select an amount of times (in minutes and seconds) and then shows the
        remaining time in minutes and seconds until it is finished.
        <app-timer />
      </p-tabPanel>
      <p-tabPanel header="World Time" layout="list">
        Here must be a list of cities that shows the current time in each city. A dropdown must be provided to allow the
        user to select other cities. See <a href="https://worldtimeapi.org/" target="_blank">https://worldtimeapi.org/</a>
        for options.
        <app-world-time />
      </p-tabPanel>
    </p-tabView>
  `,
})
export class AppComponent {}
