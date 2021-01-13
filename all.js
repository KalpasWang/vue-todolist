new Vue({
  el: '#app',
  data: {
    newTodoTitle: '',
    activeTodos: [
      {
        id: '135',
        title: '裝電腦',
        isDone: false,
      },
    ],
    doneTodos: [],
    editingTodo: {},
    editingTodoTitle: '',
    visibility: 'all',
  },
  computed: {
    isBtnDisabled() {
      return this.newTodoTitle.length < 1 ? true : false;
    },
    allTodos() {
      return this.activeTodos.concat(this.doneTodos);
    },
    visibleTodos: function () {
      if (this.visibility === 'all') {
        return this.allTodos;
      } else if (this.visibility === 'active') {
        return this.activeTodos;
      } else if (this.visibility === 'done') {
        return this.doneTodos;
      } else {
        return this.allTodos;
      }
    },
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle.length < 1) {
        return;
      }

      const newTodo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        isDone: false,
      };
      this.activeTodos.push(newTodo);
      this.newTodoTitle = '';
    },
    switchToEdit(todo, index) {
      this.editingTodo = todo;
      this.editingTodoTitle = todo.title;
      this.$nextTick(function () {
        console.log(this.$refs);
        this.$refs.visibleTodos[index].firstElementChild.focus();
      });
    },
    editTodo(todo) {
      if (this.editingTodoTitle.length < 1) {
        return;
      }

      todo.title = this.editingTodoTitle;
      this.editingTodo = {};
      this.editingTodoTitle = '';
    },
    deleteTodo(todo) {
      this.activeTodos = this.activeTodos.filter((item) => item.id !== todo.id);
    },
    clearTodos() {
      this.activeTodos = [];
      this.doneTodos = [];
    },
    changeTodoStatus(todo) {
      if (todo.isDone) {
        const i = this.doneTodos.indexOf(todo);
        this.doneTodos.splice(i, 1);
        this.activeTodos.push(todo);
      } else {
        const i = this.activeTodos.indexOf(todo);
        this.activeTodos.splice(i, 1);
        this.doneTodos.unshift(todo);
      }

      todo.isDone = !todo.isDone;
    },
  },
});
