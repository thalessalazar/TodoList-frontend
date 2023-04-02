<template>
  <div v-if="!!error" class="text-red-500 text-xs font-bold mt-1 mb-3">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "FormFeedBackFieldError",
  props: {
    error: {
      type: String,
      default: "",
    },
  },
  data: () => {
    return {};
  },
};
</script>

<style>
</style>