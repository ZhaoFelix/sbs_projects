
export class Todo {
  id: number;
  todo: string;
  isDone: boolean;
  doneTime: string | undefined;
  createTime: string | undefined;
  constructor(todo: string, id:number = 0, isDone: boolean = false, createTime?: string, doneTime?:string, ) {
    this.id = id
    this.todo = todo
    this.isDone = isDone
    this.createTime = createTime
    this.doneTime = doneTime
  }
}