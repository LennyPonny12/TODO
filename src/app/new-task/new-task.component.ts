import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  @ViewChild('taskBody', { static: false }) container: ElementRef;
  @ViewChild('nameInput') inputName: ElementRef;
  @ViewChild('descInput') inputDesc: ElementRef;

  active = false;
  edit = false;
  id;
  targetColor;

  constructor(
    private rendere: Renderer2,
    private service: AppService,
    private changeDetector: ChangeDetectorRef
  ) {
    service.edited.subscribe((data) => {
      this.onEdit(data);
    });
  }

  onAddStatus() {
    this.rendere.addClass(this.container.nativeElement, 'expand');
    this.active = true;
    this.edit = false;
  }

  back() {
    this.targetColor = '';
    this.active = false;
    this.rendere.removeClass(this.container.nativeElement, 'expand');
  }

  onColorSelect(event: Event) {
    this.targetColor = event.target as Element;

    document.querySelectorAll('.colorBox').forEach((el) => {
      el.classList.remove('selected');
    });

    if (this.targetColor) {
      if (this.targetColor.classList.contains('cancelColor')) {
        return;
      }

      this.targetColor.classList.add('selected');
    }
  }

  onAddTask(name: string, desc: string) {
    if (this.edit) {
      let elToEdit = this.service.getTasks()[this.id];
      elToEdit.desc = desc;
      elToEdit.name = name;
      if (this.targetColor) {
        elToEdit.color = this.targetColor.classList.contains('cancelColor')
          ? ''
          : this.targetColor.classList[1];
      }
      this.service.saveTasks();
      return;
    }

    if (this.targetColor) {
      this.service.addTask({
        name: name,
        desc: desc,
        isDone: false,
        color: this.targetColor.classList.contains('cancelColor')
          ? ''
          : this.targetColor.classList[1],
      });
    } else {
      this.service.addTask({
        name: name,
        desc: desc,
        isDone: false,
      });
    }

    this.service.saveTasks();

    this.back();
  }

  onEdit(data) {
    document.querySelectorAll('.colorBox').forEach((el) => {
      el.classList.remove('selected');
    });

    this.onAddStatus();
    this.edit = true;
    this.changeDetector.detectChanges();
    this.id = data.id;
    this.inputName.nativeElement.value = data.task.name;
    this.inputDesc.nativeElement.value = data.task.desc;
    if (data.task.color) {
      document.querySelector(`.${data.task.color}`).classList.add('selected');
    }
  }
}
