import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from "primeng/multiselect";
import { PanelModule } from "primeng/panel";

import { TimeService } from "@/services";
import { TimeInfo } from "@/types";
import { forkJoin, switchMap } from "rxjs";

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
        [ngModel]="value()"
        (ngModelChange)="addLocation($event)"
        placeholder="Add new location"
      />
    </p-panel>
    @for(item of items(); track item.timezone) {
      <p-panel [header]="item.timezone">
        {{ item.datetime | date : 'H:mm' : item.utc_offset }}
      </p-panel>
    }
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
  value = computed(() => this.locations().map(l => l.timezone));

  items = toSignal(
    toObservable(this.value).pipe(
      switchMap(timezones => forkJoin(timezones.map(tz => this.timeService.getTimeByTimezone(tz))))
    ),
    { initialValue: [] }
  );

  addLocation(timezones: string[]) {
    this.locations.set(timezones.map((timezone) => ({ timezone } as TimeInfo)));
  }
}
