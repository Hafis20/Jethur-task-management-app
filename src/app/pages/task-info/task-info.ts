import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from '../../services/tasks';
import { TaskWithComment } from '../../types';

@Component({
  selector: 'app-task-info',
  imports: [],
  templateUrl: './task-info.html',
})
export class TaskInfoPage implements OnInit {
  // Depedency Injection
  private route = inject(ActivatedRoute)
  private tasksService = inject(TasksService)

  // Private Variables
  private readonly taskId = signal<string | null>(null);

  // Protected Variables
  protected taskDetail = signal<TaskWithComment | undefined>(undefined)

  // Life Cycle hooks
  ngOnInit(): void {
    this.setupParams();
  }

  private setupParams() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) return;
    this.getTaskDetails(taskId);
  }

  private getTaskDetails(taskId: string) {
    this.tasksService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.taskDetail.set(task)
      }
    })
  }
}
