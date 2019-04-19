import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
  title = 'ng-expression-builder';

  functions: any = [
    { name: 'add', function: this.add, args: 2 },
    { name: 'subtract', function: this.subtract, args: 2 },
    { name: 'foo', function: this.foo, args: 3 },
    {
      name: 'doSomethingComplicated',
      function: this.doSomethingComplicated,
      args: 1
    }
  ];

  activeFunctions: any = [];
  expression: any = '';

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  foo(a, b, c) {
    return;
  }

  doSomethingComplicated(a) {
    return;
  }

  onDropToExp(event: CdkDragDrop<string[]>) {
    console.log(event.container.data, event.currentIndex);
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onDropFromExp(event: CdkDragDrop<string[]>) {
    console.log(event.container.data, event.currentIndex);
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
