import { Component, computed, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { KnobModule } from "primeng/knob";
import { Subject, interval, map, scan, startWith, switchMap, takeWhile, tap } from "rxjs";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    KnobModule,
  ],
  template: `
    <div class="timer-container">
      <div class="time-selectors">
        <div class="time-selector">
          <p-knob [min]="0" [max]="60" [size]="300" [ngModel]="timeLeftDisplay().minutes" (ngModelChange)="selectedMinutes.set($event)" />
          <label>Minutes</label>
        </div>
        <div class="time-selector">
          <p-knob [min]="0" [max]="60" [size]="300" [ngModel]="timeLeftDisplay().seconds" (ngModelChange)="selectedSeconds.set($event)" />
          <label>Seconds</label>
        </div>
      </div>
      <div class="actions">
        <p-button [label]="'Start'" (click)="startTimer$.next()" />
        <p-button [label]="paused() ? 'Resume' : 'Pause'" (click)="paused.set(!paused())" />
      </div>
    </div>
  `,
  styles: `
    .timer-container {
    width: 35%;
    margin: auto;

    .time-selectors {
        display: flex;
        justify-content: space-between;

        .time-selector {
            display: flex;
            align-items: center;
            flex-direction: column;

            label {
                font-size: 24px;
                margin-bottom: 10px;
            }
        }
    }

    .actions {
        display: flex;
        justify-content: space-around;
    }
}
  `,
})
export class TimerComponent {
  selectedMinutes = signal<number | null>(null);
  selectedSeconds = signal<number | null>(null);
  startTimer$ = new Subject<void>();
  paused = signal(false);

  timeLeft = toSignal(
    this.startTimer$.pipe(
      tap(() => this.paused.set(false)),
      switchMap(() => {
        const overallTime = (this.selectedMinutes() ?? 0) * 60 + (this.selectedSeconds() ?? 0);
        return interval(1000).pipe(
          startWith(0),
          scan(acc => this.paused() ? acc : acc + 1),
          map(n => overallTime - n),
          takeWhile(n => n >= 0)
        )
      })
    )
  );

  timeLeftDisplay = computed(() => {
    const minutes = Math.floor((this.timeLeft() ?? 0) / 60);
    const seconds = (this.timeLeft() ?? 0) - minutes * 60;
    return { minutes, seconds };
  })
}
