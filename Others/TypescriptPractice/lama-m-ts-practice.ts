interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  completedOn?: Date;
}

enum TodoStatus {
  Todo = "todo",
  inProgress = "in-progress",
  Done = "done"
}

const todoItems: Todo[] = [
  { id: 1, title: "Learn HTML", status: TodoStatus.Done, completedOn: new Date("2021-09-11") },
  { id: 2, title: "Learn TypeScript", status: TodoStatus.inProgress },
  { id: 3, title: "Write the best web app in the world", status: TodoStatus.Todo },
]

function addTodoItem(todo : string): Todo {
  const id = getNextId(todoItems)

  const newTodo = {
      id,
      title: todo,
      status: TodoStatus.Todo,
  }

  todoItems.push(newTodo)

  return newTodo
}

function getNextId(items : Todo[]): number {
  return items.reduce((max, x) => x.id > max ? max : x.id, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))