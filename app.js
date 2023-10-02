// Modelo (Model): Responsável pelos dados e operações relacionadas aos dados.
const model = {
  todos: [],

  addTodo: function (todo) {
    this.todos.push({ text: todo, completed: false });
    this.sortTodos();
  },

  updateTodo: function (index, updatedTodo) {
    this.todos[index].text = updatedTodo;
    this.sortTodos();
  },

  deleteTodo: function (index) {
    this.todos.splice(index, 1);
  },

  sortTodos: function () {
    this.todos.sort((a, b) => a.text.localeCompare(b.text));
  },

  deleteAllTodos: function () {
    this.todos = [];
  },

  toggleComplete: function (index) {
    this.todos[index].completed = !this.todos[index].completed;
  },
};

// Visualização (View): Responsável por renderizar os dados na interface do usuário.
const view = {
  todoList: document.getElementById("todo-list"),

  renderTodos: function (todos) {
    this.todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      const todoText = document.createElement("span");
      todoText.textContent = todo.text;

      if (todo.completed) {
        todoText.innerHTML = `<strike>${todo.text}</strike>`;
      }

      const editButton = this.createIconButton("<i class='fas fa-edit'></i>", "Editar", () => this.onEditClick(index));
      const deleteButton = this.createIconButton("<i class='fas fa-trash'></i>", "Excluir", () => this.onDeleteClick(index));
      const completeButtonText = todo.completed ? "Desfazer" : "Concluir";
      const completeButton = this.createIconButton("<i class='fas fa-check'></i>", completeButtonText, () => this.onCompleteClick(index));
      
      
      todoItem.appendChild(todoText);
      todoItem.appendChild(editButton);
      todoItem.appendChild(deleteButton);
      todoItem.appendChild(completeButton);

      this.todoList.appendChild(todoItem);
    });
  },

  clearList: function () {
    this.todoList.innerHTML = "";
  },


  createIconButton: function (iconHTML, text, onClick) {
    const button = document.createElement("button");
    button.innerHTML = `${iconHTML} ${text}`;
    button.addEventListener("click", onClick);
    return button;
  },

  onEditClick: function (index) {
    const updatedTodo = prompt("Editar tarefa:", model.todos[index].text);
    if (updatedTodo !== null && updatedTodo.trim() !== "") {
      model.updateTodo(index, updatedTodo);
      this.renderTodos(model.todos);
    }
  },

  onDeleteClick: function (index) {
    model.deleteTodo(index);
    this.renderTodos(model.todos);
  },

  onCompleteClick: function (index) {
    model.toggleComplete(index);
    this.renderTodos(model.todos);
  },
};

// Controlador (Controller): Responsável por controlar a interação do usuário e atualizar o modelo e a visualização conforme necessário.
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", (event) => this.onFormSubmit(event));

    const deleteAllButton = document.getElementById("delete-all");
    deleteAllButton.addEventListener("click", () => this.onDeleteAllClick());

    view.renderTodos(model.todos);
  },

  onFormSubmit: function (event) {
    event.preventDefault();
    const todoInput = document.getElementById("todo-input");
    const todo = todoInput.value;

    if (todo.trim() !== "") {
      model.addTodo(todo);
      view.renderTodos(model.todos);
      todoInput.value = "";
    }
  },

  onDeleteAllClick: function () {
    model.deleteAllTodos();
    view.clearList();
  },
};



// Inicializa o controlador
controller.init();
