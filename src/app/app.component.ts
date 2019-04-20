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
  innerFunctions: any = [
    {
      name: 'doSomethingComplicated',
      function: this.doSomethingComplicated,
      args: [''],
      children: []
    }
  ];
  expression: any = '';
  inputs: any = [];
  innerInputs: any = this.innerFunctions[0].args;

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
    let initFunctions = this.functions;

    console.log(event.container);
    console.log(event.previousContainer);
    console.log('===================');
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.inputs = this.activeFunctions[event.currentIndex].args;
      console.log(this.inputs);
      this.functions.push(this.activeFunctions[event.currentIndex]);
    }
  }

  evaluateExpression(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  resetButton() {
    this.activeFunctions = [];
    this.innerFunctions = [
      {
        name: 'doSomethingComplicated',
        function: this.doSomethingComplicated,
        args: [''],
        children: []
      }
    ];
    this.inputs = [];
    this.innerInputs = this.innerFunctions[0].args;
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
