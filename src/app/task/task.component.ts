import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AppService, Task } from '../app.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: Task;
  @Input() index;
  @ViewChild('edit', { static: false }) dots: ElementRef;
  @ViewChild('delete', { static: false }) deleteIcon: ElementRef;

  constructor(private service: AppService, private rendere: Renderer2) {}

  change() {
    this.service.changeStatus(this.index);
  }

  onAnimationRemove() {
    this.rendere.addClass(this.dots.nativeElement, 'editAnimationLeft');
    this.rendere.addClass(this.deleteIcon.nativeElement, 'editAnimationRight');
  }

  onAnimationAdd() {
    this.rendere.removeClass(this.dots.nativeElement, 'editAnimationLeft');
    this.rendere.removeClass(
      this.deleteIcon.nativeElement,
      'editAnimationRight'
    );
  }

  onEdit() {
    this.service.edited.next({
      task: this.service.returnTaskById(this.index),
      id: this.index,
    });
  }

  onDelete() {
    this.service.deleteTaskById(this.index);
    this.service.saveTasks();
  }
}
