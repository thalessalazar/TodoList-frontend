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

        <span class="font-medium text-gray-500 truncate">{{ this.todo.title }}</span>
      </div>
      <!--/ Todo title -->

      <!-- Todo form -->
      <form
        class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
      >
        <input
          placeholder="Adicione um novo item ..."
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
      <div v-if="todo.tasks.length > 0" class="bg-gray-300 rounded-sm">
        <div
          class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
        >
          <div class="cursor-pointer mr-2">
            <div class="h-5 w-5 flex items-center justify-center">
              <div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
            </div>

            <div class="cursor-pointer mr-2">
              <svg
                class="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <div class="w-full">
            <input
              type="text"
              placeholder="Digite a sua tarefa"
              value="Estudar lifecycle"
              class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
            />
          </div>

          <div class="ml-auto flex items-center justify-center">
            <button class="focus:outline-none">
              <svg
                class="ml-3 h-4 w-4 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
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

export default {
  name: "TodoTasks",
  components: {
    Spinner,
    RouterLink,
  },
  created() {
    this.getTodo();
  },
  data() {
    return {
      todo: {},
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
  },
};
</script> 