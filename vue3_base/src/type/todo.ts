
export class Todo {
  todo: string;
  date: string;
  isDone: boolean;
  doneTime: string | undefined;
  constructor(todo: string, date: string,isDone: boolean = false, doneTime?:string, ) {
    this.todo = todo
    this.date = date
    this.isDone = isDone
    this.doneTime = doneTime
  }
}