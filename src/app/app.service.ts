import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';

export interface Task {
  name: string;
  desc: string;
  isDone: boolean;
  color?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  edited = new Subject<{ task: Task; id: number }>();
  taskListChanged = new Subject<Task[]>();
  isLogged = false;
  constructor(private http: HttpClient) {}

  private tasks: Task[] = [
    { name: 'Idz na silka', desc: 'Masz isc na silka ja', isDone: true },
    { name: 'Wdup Bialko', desc: 'Bielsko biala', isDone: false },
  ];

  getTasks() {
    return this.tasks;
  }

  changeStatus(index) {
    this.tasks[index].isDone = !this.tasks[index].isDone;
  }

  setTasks(task: Task[]) {
    this.tasks = task;
  }

  addTask(task: Task) {
    if (task.name === '') return;
    if (task.desc === '') return;

    this.tasks.push({
      name: task.name,
      desc: task.desc,
      isDone: task.isDone,
      color: task.color,
    });
  }

  returnTaskById(id: number) {
    return this.tasks[id];
  }

  deleteTaskById(id: number) {
    this.tasks.splice(id, 1);
  }

  saveTasks() {
    if (this.isLogged) {
      this.http
        .put(
          'https://todolistproject-932a1-default-rtdb.firebaseio.com/tasks.json',
          this.tasks
        )
        .subscribe((data) => {
          this.taskListChanged.next(this.tasks);
        });
    }
  }

  fetchData() {
    if (this.isLogged) {
      this.http
        .get<Task[]>(
          'https://todolistproject-932a1-default-rtdb.firebaseio.com/tasks.json'
        )
        .subscribe((data) => {
          this.taskListChanged.next(data);
          this.tasks = data;
        });
    }
  }
}
