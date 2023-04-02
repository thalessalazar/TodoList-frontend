<template>
  <div :class="colorComputed.badge">
    <h3 :class="colorComputed.text">
      {{ message }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "FormFeedBackAlert",
  props: {
    color: {
      type: String,
      default: "red",
    },
    message: {
      type: String,
      default: "kasjdkashdkashd",
    },
  },
  computed: {
    colorComputed() {
      let classVariant = {
        danger: {
          badge: "rounded:lg bg-red-500 p-4 mb-4",
          text: "text-sm leading-5 font-medium text-white"
        },
        success: {
          badge: "rounded:lg bg-green-500 p-4 mb-4",
          text: "text-sm leading-5 font-medium text-white"
        },
        info: {
          badge: "rounded:lg bg-blue-500 p-4 mb-4",
          text: "text-sm leading-5 font-medium text-white"
        },
        warning: {
          badge: "rounded:lg bg-yellow-500 p-4 mb-4",
          text: "text-sm leading-5 font-medium text-white"
        },
      };
      return classVariant[this.color];
    },
  },
};
</script>

<style>
</style>