import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from "primeng/multiselect";
import { PanelModule } from "primeng/panel";

import { TimeService } from "@/services";
import { TimeInfo } from "@/types";

@Component({
  selector: 'app-world-time',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    FormsModule,
    MultiSelectModule,
    PanelModule,
  ],
  template: `
    <p-panel header="Time in the world">
      <p-multiSelect
        [options]="timezones()"
        placeholder="Add new location"
      />
    </p-panel>
  `
})
export class WorldTimeComponent {
  private readonly timeService = inject(TimeService);
  timezones = toSignal(this.timeService.getTimeZones(), {
    initialValue: [],
  });
  locations = signal<TimeInfo[]>([
    { timezone: 'Europe/Berlin' } as TimeInfo,
    { timezone: 'Asia/Yerevan' } as TimeInfo,
    { timezone: 'Europe/Kyiv' } as TimeInfo,
  ]);

  addLocation(timezones: string[]) {
    this.locations.set(timezones.map((timezone) => ({ timezone } as TimeInfo)));
  }
}
