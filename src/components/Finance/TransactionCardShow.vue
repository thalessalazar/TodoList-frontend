<template>
  <div
    class="flex items-center justify-between bg-gray-900 rounded-lg px-4 h-15 mb-2 border-l-4 border-l-green-400"
  >
    <span class="text-slate-50 font-light truncate">
      {{ transaction.title }}
    </span>

    <span class="text-slate-50 ">
      <template v-if="type === 'REVENUE'"> + </template>
      <template v-else> - </template>
      R$ {{ transaction.value }}
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
  