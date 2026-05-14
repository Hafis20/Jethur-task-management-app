import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs'
import { Task, TaskWithComment } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // Dependency Injection
  private http = inject(HttpClient);


  /**
   * Method for fetching tasks
   */
  public getTasks(sortById?: 'ASC' | 'DESC'): Observable<TaskWithComment[]> {
    return this.http.get<TaskWithComment[]>('assets/task.json').pipe(
      map((response) => {
        return response;
      })
    )
  }


  /**
   * Method returns ascending or descending array of Tasks
   * @param operation what type of sorting 'ASC' or 'DESC'
   * @returns Sorted array of Tasks
   */
  public sortById(operation: 'ASC' | 'DESC'): Observable<TaskWithComment[]> {
    return this.http.get<TaskWithComment[]>('assets/task.json').pipe(
      map((response) => {
        if (operation === 'ASC') {
          return response.sort(function (a, b) {
            if (a.id < b.id) { return 1; }
            if (a.id > b.id) { return -1; }
            return 0;
          })
        } else {
          return response.sort(function (a, b) {
            if (a.id < b.id) { return -1; }
            if (a.id > b.id) { return 1; }
            return 0;
          })
        }

      })
    )
  }

  public addTask(){

  }

  /**
   * Method which returns Task detail by id
   * 
   * @param taskId Task Id
   * @returns {TaskWithComment} Resolves an object with task details otherwise undefined
   */
  public getTaskById(taskId: string): Observable<TaskWithComment | undefined> {
    return this.http.get<TaskWithComment[]>('assets/task.json').pipe(
      map((response) => response.find((task) => task.id === taskId))
    )
  }
}
