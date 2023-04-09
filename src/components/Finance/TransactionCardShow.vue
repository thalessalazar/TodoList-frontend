<template>
  <div
    :class="`flex items-center justify-between bg-gray-900 rounded-lg px-4 h-15 mb-2 border-l-4 ${borderClass}`"
  >
    <div class="text-slate-50 truncate text-base font-medium">
      <div>
        {{ transaction.title }}
      </div>
      <div class="font-light text-xs">
        {{ dateFormated }}
      </div>
    </div>

    <span class="text-slate-50 font-bold">
      <template v-if="isRevenue"> + </template>
      <template v-else> - </template>
      R$ {{ transactionValue }}
    </span>
  </div>
</template>
  
  <script>
import TwDropdown from "@/components/Utils/TwDropdown.vue";
import TwDropdownItem from "@/components/Utils/TwDropdownItem.vue";
import { RouterLink } from "vue-router";

export default {
  name: "TransactionCardShow",
  components: {
    TwDropdown,
    TwDropdownItem,
    RouterLink,
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    transactionValue() {
      return this.transaction.value.toFixed(2);
    },
    borderClass() {
      const variants = {
        REVENUE: "border-l-green-400",
        EXPENSE: "border-l-rose-500",
      };

      return variants[this.transaction.type];
    },
    isRevenue() {
      return this.transaction.type === "REVENUE";
    },
    isExpense() {
      return this.transaction.type === "EXPENSE";
    },
    dateFormated() {
      const event = new Date(this.transaction.date);
      return event.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },
  },
  methods: {
    onDelete() {
      this.$emit("delete");
    },
    onUpdate() {
      this.$emit("update");
    },
  },
};
</script>
  