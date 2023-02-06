import { Component, OnInit } from '@angular/core';
import { AppService, Task } from '../app.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private service: AppService) {
    this.tasks = service.getTasks();
  }

  ngOnInit(): void {
    this.service.taskListChanged.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
