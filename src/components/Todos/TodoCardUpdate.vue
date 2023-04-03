<template>
  <ValidationObserver
    ref="todoUpdateForm"
    tag="form"
    @submit.stop.prevent="onSave"
  >
    <div class="flex items-center bg-gray-900 rounded-sm px-4 h-15 mb-2">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        name="Título"
        class="w-full mr-3"
      >
        <input
          v-model="localTitle"
          ref="title"
          type="text"
          placeholder="Digite o nome da sua lista ..."
          class="bg-gray-900 placeholder-gray-700 text-slate-50 focus:outline-none block w-full appearance-none leading-normal pr-3 font-medium"
        />

        <div v-if="!!errors[0]" class="text-red-500 text-sm mb-2">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <div class="flex items-center ml-auto">
        <a
          href=""
          class="text-xs text-slate-100 mr-2 focus:outline-none"
          @click.stop.prevent="onCancel()"
        >
          Cancelar
        </a>

        <button
          type="submit"
          class="bg-blue-700 text-blue-100 text-xs font-semibold px-2.5 py-1 rounded focus:outline-none"
        >
          Salvar
        </button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "TodoCardUpdate",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localTitle: this.todo.title,
    };
  },
  mounted() {
    this.$refs.title.focus();
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    async onSave() {
      const validator = await this.$refs.todoUpdateForm.validate();
      if (!validator) {
        return;
      }

      const payload = {
        title: this.localTitle,
      };

      this.$axios.put(`/v1/todos/${this.todo.id}`, payload).then((response) => {
        this.todo.title = payload.title;
        this.onCancel();
      });
    },
  },
};
</script>

<style>
</style>