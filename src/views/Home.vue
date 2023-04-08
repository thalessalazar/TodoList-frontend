<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">Lista de tarefas</div>
    </div>


    <!-- Todo form -->
    <form
      class="flex items-center px-4 bg-gray-900 h-15 rounded-lg mb-3"
      @submit.stop.prevent="createTodo()"
    >
      <input
        v-model="newTodo"
        placeholder="Digite o nome da sua lista ..."
        type="text"
        class="bg-gray-900 placeholder-gray-700 text-slate-50 focus:outline-none block w-full appearance-none leading-normal pr-3 font-medium"
      />

      <button
        type="submit"
        class="text-slate-50 text-xs font-semibold focus:outline-none"
      >
        ADICIONAR
      </button>
    </form>
    <!--/ Todo form -->

    <div v-if="this.spinner.get_todos" class="text-center"><Spinner /></div>

    <!-- Todos container -->
    <div>
      <!-- Todo card show -->
      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @afterDeleting="afterDeleting(todo)"
      />
    </div>
    <!--/ Todos container -->
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Spinner from "@/components/utils/Spinner.vue";
import TodoCard from "@/components/Todos/TodoCard.vue";

export default {
  name: "Home",
  components: {
    ValidationObserver,
    ValidationProvider,
    Spinner,
    TodoCard,
  },
  created() {
    this.getTodos();
  },
  data() {
    return {
      todos: [],
      newTodo: "",
      spinner: {
        get_todos: false,
        create_todo: false,
      },
    };
  },
  methods: {
    getTodos() {
      this.setGetTodoSpinner(true);
      this.$axios
        .get("/v1/todos")
        .then((response) => {
          this.todos = response.data.data.map((todo) => ({
            ...todo,
            state: "show",
          }));
        })
        .catch((error) => {})
        .finally(() => {
          this.setGetTodoSpinner(false);
        });
    },
    setGetTodoSpinner(flag) {
      this.spinner.get_todos = flag;
    },
    setCreateTodoSpinner(flag) {
      this.spinner.create_todo = flag;
    },
    createTodo() {
      if (!this.newTodo) return;

      this.setCreateTodoSpinner(true);
      const payload = {
        title: this.newTodo,
      };

      this.$axios
        .post("/v1/todos", payload)
        .then((response) => {
          this.todos.unshift({ ...response.data.data, state: "show" });
          this.newTodo = "";
        })
        .catch((error) => {});
    },

    afterDeleting(todo) {
      const indexTodoToRemove = this.todos.findIndex(
        (todoIterate) => todoIterate.id === todo.id
      );
      this.todos.splice(indexTodoToRemove, 1);
    },
  },
};
</script>

<style></style>