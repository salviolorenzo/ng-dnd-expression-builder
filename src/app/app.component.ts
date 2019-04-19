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

  activeFunctions: any = [];
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

  onDropToExp(event: CdkDragDrop<string[]>) {
    console.log(event.container.data);
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.inputs = this.activeFunctions[event.currentIndex].args;
      // this.activeFunctions.push(event.container.data);
      console.log(this.inputs);
    }
  }

  evaluateExpression(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  resetButton() {
    this.activeFunctions = [];
    this.inputs = [];
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
