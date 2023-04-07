<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <!-- Todo spinner -->
    <div v-if="this.spinner.get_todo" class="text-center">
      <Spinner />
    </div>
    <!--/ Todo spinner -->

    <template v-else>
      <!-- Todo title -->
      <div class="flex items-center mb-8">
        <RouterLink
          :to="{ name: 'index' }"
          class="-ml-2 text-gray-500 font-medium flex items-center bg-blue-500 mr-4 p-1 rounded-full text-center hover:bg-blue-700 transition-all"
        >
          <svg
            class="h-5 w-5 text-slate-100"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
              fill="currentColor"
            />
          </svg>
        </RouterLink>

        <span class="font-medium text-gray-500 truncate">{{
          this.todo.title
        }}</span>
      </div>
      <!--/ Todo title -->

      <!-- Todo form -->
      <form
        @submit.stop.prevent="addTodoTask()"
        class="flex items-center px-4 bg-gray-900 h-15 rounded-lg mb-3"
      >
        <input
          placeholder="Adicione uma nova tarefa ..."
          v-model="newTodoTaskTitle"
          type="text"
          class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal pr-3"
        />

        <button
          class="text-green-400 text-xs font-semibold focus:outline-none"
          type="submit"
        >
          ADICIONAR
        </button>
      </form>
      <!--/ Todo form -->

      <!-- Todo items -->
      <div v-if="todo.tasks.length > 0" class="">
        <TodoTaskCard
          v-for="task in this.todo.tasks"
          :key="task.id"
          :task="task"
          @afterDeleting="afterDeletingTask"
        />
      </div>
      <!--/ Todo items -->

      <!-- Todo empty -->
      <div v-else class="text-center text-lg text-gray-600">
        Você ainda não tem nenhuma tarefa.
      </div>
    </template>

    <!--/ Todo empty -->
  </div>
</template>

<script>
import Spinner from "@/components/Utils/Spinner.vue";
import { RouterLink } from "vue-router";
import TodoTaskCard from "@/components/Todos/TodoTaskCard.vue";

export default {
  name: "TodoTasks",
  components: {
    Spinner,
    RouterLink,
    TodoTaskCard,
  },
  created() {
    this.getTodo();
  },
  data() {
    return {
      todo: {},
      newTodoTaskTitle: "",
      spinner: {
        get_todo: false,
      },
    };
  },
  computed: {
    isCompleted() {
      return todoTask.completed;
    },
  },
  methods: {
    getTodo() {
      this.setGetTodoSpinner(true);
      this.$axios
        .get(`v1/todos/${this.$route.params.id}`)
        .then((response) => {
          this.todo = response.data.data;
        })
        .finally(() => {
          this.setGetTodoSpinner(false);
        });
    },
    setGetTodoSpinner(flag) {
      this.spinner.get_todo = flag;
    },
    addTodoTask() {
      if (!this.newTodoTaskTitle) return;

      const payload = {
        title: this.newTodoTaskTitle,
      };

      this.$axios
        .post(`/v1/todos/${this.$route.params.id}/todo_tasks`, {
          ...payload,
        })
        .then((response) => {
          this.todo.tasks.unshift(response.data.data);
          this.newTodoTaskTitle = "";
        });
    },

    afterDeletingTask(task) {
      const indexTask = this.todo.tasks.findIndex(
        (item) => item.id === task.id
      );

      this.todo.tasks.splice(indexTask, 1);
    },
  },
};
</script> 