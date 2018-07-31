import { Component } from '@angular/core';
import { Todo } from './todo';
import { config } from './config';
import { todoList } from './todo-list';
import * as firebase from 'firebase/app';
import 'firebase/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tsundoku.tech';
  todoList = todoList;
  books: any = [];

  constructor() {
    firebase.initializeApp(config);
    
    const getBooks = firebase.functions().httpsCallable('getBooks');
    getBooks().then(result => {
      this.books = result.data;
    }).catch(
      error => console.log(error.details)
    );
  }

  addTodo(todo: Todo) {
    this.todoList.unshift(todo);
  }
}
