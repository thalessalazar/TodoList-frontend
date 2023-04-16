<template>
  <button
    type="submit"
    :disabled="this.isloading"
    :class="`flex items-center justify-center rounded-lg ${colorComputed} font-medium text-sm focus:outline-none py-3 px-4 block w-full`"
  >
    <img
      v-if="this.isloading"
      src="@/assets/img/spinner.svg"
      alt=""
      class="w-5 h-5 mr-2"
    />

    {{ text }}
  </button>
</template>

<script>
export default {
  name: "LoadingButton",
  props: {
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "info",
    },
    isloading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorComputed() {
      let classVariant = {
        danger: "bg-red-800 text-white",
        success: "bg-green-800 text-white",
        info: "bg-blue-800 text-white",
        warning: "bg-yellow-800 text-black",
      };
      return classVariant[this.color];
    },
  },
};
</script>