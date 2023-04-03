<template>
  <div>
    <!-- <input
      class="bg-gray-900 placeholder-gray-700 text-slate-50 focus:outline-none block w-full appearance-none leading-normal pr-3 font-medium"
      type="text"
      v-model="todo.title"
      @keyup.enter="updateTodo(todo)"
    /> -->
    <TodoCardShow
      v-if="isShowing"
      :todo="todo"
      @update="changeStateToUpdate()"
      @delete="changeStateToDelete()"
    />

    <TodoCardUpdate
      v-if="this.isUpdating"
      :todo="todo"
      @cancel="changeStateToShow()"
    />

    <TodoCardDelete
      v-if="this.isDeleting"
      :todo="todo"
      @cancel="changeStateToShow()"
      @afterDeleting="afterDeleting"
    />
  </div>
</template>

<script>
import TodoCardShow from "@/components/Todos/TodoCardShow.vue";
import TodoCardUpdate from "@/components/Todos/TodoCardUpdate.vue";
import TodoCardDelete from "@/components/Todos/TodoCardDelete.vue";

export default {
  name: "TodoCard",
  components: {
    TodoCardShow,
    TodoCardUpdate,
    TodoCardDelete,
  },
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    isShowing() {
      return this.todo.state === "show";
    },
    isUpdating() {
      return this.todo.state === "update";
    },
    isDeleting() {
      return this.todo.state === "delete";
    },
  },

  methods: {
    changeStateToShow() {
      return (this.todo.state = "show");
    },
    changeStateToUpdate() {
      return (this.todo.state = "update");
    },
    changeStateToDelete() {
      return (this.todo.state = "delete");
    },
    afterDeleting() {
      return this.$emit("afterDeleting");
    },
  },
};
</script>

<style>
</style>