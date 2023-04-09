<template>
  <div>
    <TransactionCardShow
      :transaction="transaction"
      v-if="isShowing"
      @delete="changeStateToDelete"
      @update="changeStateToUpdate"
    />
  </div>
</template>

<script>
import TransactionCardShow from "@/components/Finance/TransactionCardShow.vue";

export default {
  name: "TransactionCard",
  components: {
    TransactionCardShow,
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isShowing() {
      return this.transaction.state === "show";
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
  },
};
</script>

<style>
</style>