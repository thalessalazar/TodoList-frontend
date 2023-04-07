<template>
  <div
    class="flex items-center justify-between bg-gray-900 rounded-lg px-4 h-15 mb-2"
  >
    <ActionRadioButton
      :state="this.task.completed"
      @clicked="updateTodoTaskComplete()"
    />

    <div class="w-full">
      <input
        v-model="task.title"
        ref="input"
        type="text"
        placeholder="Digite a sua tarefa"
        class="bg-gray-900 placeholder-gray-500 text-slate-50 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
        @input="handleInput"
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
</template>

<script>
import { debounce } from "lodash";
import ActionRadioButton from "@/components/Form/ActionRadioButton.vue";

export default {
  name: "TodoTaskCard",
  components: {
    ActionRadioButton,
  },
  props: {
    task: Object,
    default: () => ({}),
  },
  methods: {
    updateTodoTaskTitle() {
      if (!this.taks.title) return;

      const payload = {
        title: this.task.title,
      };

      this.$axios.put(`/v1/todo_tasks/${this.task.id}`, payload);
    },

    updateTodoTaskComplete() {
      this.task.completed = !this.task.completed;
      this.$axios.put(`/v1/todo_tasks/${this.task.id}`, {
        completed: this.task.completed,
      });
    },

    handleInput: debounce(function () {
      this.updateTodoTask();
    }, 500),
  },
};
</script>