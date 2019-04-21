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
  innerFunctions: any = [];
  expression: any = '';
  inputs: any = [];
  innerInputs: any = [];
  isDisabled: boolean = false;

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
    console.log(event.container);
    console.log(event.previousContainer);
    console.log('===================');

    if (
      event.previousContainer !== event.container &&
      event.container.id === 'cdk-drop-list-0'
    ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (this.inputs.length === 0) {
        this.inputs = this.activeFunctions[event.currentIndex].args;
      } else {
        this.activeFunctions[event.currentIndex].args.forEach(item => {
          this.inputs.push(item);
        });
      }
      this.functions.push(this.activeFunctions[event.currentIndex]);
    } else {
      return false;
    }
  }

  onDropToInner(event: CdkDragDrop<string[]>) {
    if (
      event.previousContainer !== event.container &&
      event.container.id !== 'cdk-drop-list-0'
    ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.innerInputs = this.innerFunctions[event.currentIndex].args;
      console.log(this.inputs);
      this.functions.push(this.activeFunctions[event.currentIndex]);
    }
  }

  // evaluateExpression(event) {
  //   event.preventDefault();
  //   console.log(event.target.value);
  // }

  resetButton() {
    this.activeFunctions = [];
    this.innerFunctions = [];
    this.inputs = [];
    this.innerInputs = [];
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
