import { Component, ViewContainerRef } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
  title = 'ng-expression-builder';

  functions: any = [
    {
      name: 'add',
      function: this.add,
      args: ['', '']
    },
    {
      name: 'subtract',
      function: this.subtract,
      args: ['', '']
    },
    {
      name: 'foo',
      function: this.foo,
      args: ['', '', '']
    },
    {
      name: 'doSomethingComplicated',
      function: this.doSomethingComplicated,
      args: ['']
    }
  ];

  activeFunctions: any = [];
  innerFunctions: any = [];
  expression: any = '';
  inputs: any = [];

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

  onDropToExp(event: CdkDragDrop<object[]>, containerId) {
    console.log(event);

    if (
      event.previousContainer !== event.container &&
      containerId === 'cdk-drop-list-0'
    ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.functions.splice(
        event.previousIndex,
        0,
        this.activeFunctions[event.currentIndex]
      );
    } else if (
      event.previousContainer !== event.container &&
      containerId !== 'cdk-drop-list-0'
    ) {
      console.log(containerId);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.functions.splice(
        event.previousIndex,
        0,
        this.innerFunctions[event.currentIndex]
      );
    }
    console.log(this.innerFunctions);
    console.log(this.activeFunctions);
  }

  resetButton() {
    this.activeFunctions = [];
    this.innerFunctions = [];
    this.functions = [
      {
        name: 'add',
        function: this.add,
        args: ['', ''],

        children: []
      },
      {
        name: 'subtract',
        function: this.subtract,
        args: ['', ''],

        children: []
      },
      {
        name: 'foo',
        function: this.foo,
        args: ['', '', ''],

        children: []
      },
      {
        name: 'doSomethingComplicated',
        function: this.doSomethingComplicated,
        args: [''],

        children: []
      }
    ];
  }
}
