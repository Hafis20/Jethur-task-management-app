import { Component, DestroyRef, inject, model, OnInit, signal } from '@angular/core';
import { TasksService } from '../../services/tasks';
import { Task, TaskWithComment } from '../../types';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { RouterLink } from '@angular/router';
import { Sort } from '../../types/sort.type';
import { Dialog } from '../../components/dialog/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, distinctUntilChanged, interval, Subject, switchMap, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [TruncatePipe, RouterLink, Dialog, ReactiveFormsModule],
  templateUrl: './tasks.html',
})
export class TasksPage implements OnInit {
  // Dependency injection
  private taskService = inject(TasksService);
  private fb = inject(FormBuilder);
  private destroyRef$ = new Subject<void>()

  // Protected properties
  protected tasks = signal<TaskWithComment[]>([]);
  protected idSort = signal<Sort>('ASC');
  protected isDialogOpen = signal<boolean>(false);
  protected taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.min(3), Validators.max(80)]],
    description: ['', [Validators.required, Validators.min(10)]],
    assignee: ['', [Validators.required, Validators.min(3)]],
    priority: [],
    status: [],
    dueDate: [],
  });
  protected readonly priorities = ['High', 'Critical', 'Medium', 'Low'];
  protected readonly statuses = ['Completed', 'In Progress', 'Pending'];
  protected searchForm = this.fb.group({
    searchText: ['']
  })


  // Lifecycle Hooks
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (val) => {
        this.tasks.set(val);
      }
    })
  }


  protected sortById() {
    this.idSort.update((state) => state === 'ASC' ? 'DESC' : 'ASC')
    this.taskService.sortById(this.idSort()).subscribe({
      next: (val) => {
        this.tasks.set(val);
      }
    })
  }

  protected addTask() {
    if (this.taskForm.invalid) return;

    // We have to call api and update the api
    const task = {
      id: `1`,
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      assignee: this.taskForm.get('assignee')?.value,
      priority: this.taskForm.get('priority')?.value,
      status: this.taskForm.get('status')?.value,
      dueDate: this.taskForm.get('dueDate')?.value,
      comments: [],
    }

    this.tasks.update((prevTasks) => {
      return [...prevTasks]
    })

    this.closeDialog();
  }

  protected searchByTitleOrAssignee() {
    this.searchForm.get('searchText')?.valueChanges.pipe(
      takeUntil(this.destroyRef$),
      distinctUntilChanged(),
      debounce(() => timer(300)),
    ).subscribe()
  }

  protected openDialog() {
    this.isDialogOpen.set(true);
  }

  protected closeDialog() {
    this.taskForm.reset();
    this.isDialogOpen.set(false);
  }
}
