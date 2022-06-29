
export class Todo {
  todo: string;
  date: string;
  isDone: boolean;
  constructor(todo: string, date: string, isDone: boolean) {
    this.todo = todo
    this.date = date
    this.isDone = isDone
  }
}