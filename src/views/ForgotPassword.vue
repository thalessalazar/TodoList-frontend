<template>
  <div>
    <h3 class="py-2 mb-8 text-gray-500 text-lg font-medium text-center">
      Esqueci minha senha
    </h3>

    <FormFeedBackAlert
      v-if="!!response.message"
      :message="response.message"
      :color="response.color"
    />

    <ValidationObserver
      ref="forgotPasswordForm"
      tag="form"
      @submit.stop.prevent="forgotPassword()"
    >
      <div class="grid gap-2">
        <ValidationProvider
          rules="required|email"
          name="E-mail"
          v-slot="{ errors }"
        >
          <input
            v-model="email"
            type="text"
            placeholder="Digite seu e-mail"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />

          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <LoadingButton
          :isloading="this.spinner.forgotPassword"
          :text="'RECUPERAR SENHA'"
          :color="'info'"
        />

        <div class="my-4 text-center">
          <RouterLink
            :to="{ path: '/login' }"
            class="text-sm font-light"
          >
            Voltar
          </RouterLink>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormFeedBackFieldError from "@/components/Form/FormFeedBackFieldError.vue";
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import LoadingButton from "@/components/Form/LoadingButton.vue";
import errorCode from "@/utils/errorCode";

export default {
  components: {
    RouterLink,
    ValidationObserver,
    ValidationProvider,
    FormFeedBackAlert,
    FormFeedBackFieldError,
    LoadingButton,
  },
  data() {
    return {
      email: "",
      spinner: {
        forgotPassword: false,
      },
      response: {
        color: "",
        message: "",
      },
    };
  },
  methods: {
    async forgotPassword() {
      const validator = await this.$refs.forgotPasswordForm.validate();
      if (!validator) return;

      const payload = { email: this.email };

      this.setForgotPasswordSpinner(true);

      this.$axios
        .post("/v1/forgot-password", payload)
        .then((response) => {
          this.setForgotPasswordSpinner(false);
          this.resetForm();
          this.response.color = "success";
          this.response.message = "Enviamos um e-mail com instruções de redefinição de senha.";
        })
        .catch((error) => {
          this.setForgotPasswordSpinner(false);
          this.response.color = "danger";
          this.response.message = errorCode(error?.response?.data?.error);
        });
    },
    setForgotPasswordSpinner(flag) {
      this.spinner.forgotPassword = flag;
    },
    resetForm() {
      this.$refs.forgotPasswordForm.reset();
      this.email = "";
    },
  },
};
</script>