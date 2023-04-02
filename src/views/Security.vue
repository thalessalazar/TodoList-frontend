<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">Alterar Senha</div>
    </div>

    <FormFeedBackAlert
      v-if="!!response.message"
      :message="response.message"
      :color="response.color"
    />

    <ValidationObserver
      ref="securityForm"
      tag="form"
      @submit.stop.prevent="updatePassword"
    >
      <div class="grid grid-cols-1 gap-2">
        <ValidationProvider
          v-slot="{ errors }"
          :rules="{ regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/ }"
          name="Senha"
        >
          <label
            for="password"
            class="block text-sm text-gray-500 font-medium mb-2"
          >
            Senha atual
          </label>

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />

          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <ValidationProvider
          vid="newPassword"
          v-slot="{ errors }"
          :rules="{ regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/ }"
          name="Nova senha"
        >
          <label
            for="newPassword"
            class="block text-sm text-gray-500 font-medium mb-2"
          >
            Nova senha
          </label>

          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            placeholder="Digite sua senha"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />

          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required|confirmed:newPassword"
          name="Confirmação de Senha"
        >
          <label
            for="newPasswordConfirmation"
            class="block text-sm text-gray-500 font-medium mb-2"
          >
            Confirmar nova senha
          </label>
          <input
            v-model="newPasswordConfirmation"
            id="newPasswordConfirmation"
            type="password"
            placeholder="Confirme sua senha"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />
          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <LoadingButton
          :isloading="this.spinner.update_password"
          :text="'SALVAR'"
          :color="'info'"
        />
      </div>
    </ValidationObserver>
  </div>
</template>
  
  <script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import FormFeedBackFieldError from "@/components/Form/FormFeedBackFieldError.vue";
import LoadingButton from "@/components/Form/LoadingButton.vue";
import errorCode from "@/utils/errorCode";

export default {
  name: "security",
  components: {
    ValidationObserver,
    ValidationProvider,
    FormFeedBackAlert,
    FormFeedBackFieldError,
    LoadingButton,
  },
  data() {
    return {
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        update_password: false,
      },
    };
  },

  methods: {
    async updatePassword() {
      console.log(this.newPassword, this.newPasswordConfirmation);
      const validator = await this.$refs.securityForm.validate();
      console.log(validator);
      if (!validator) return;

      this.setUpdatePasswordSpinner(true);

      const payload = {
        password: this.password,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
      };

      this.$axios
        .put("v1/me/update-password", payload)
        .then((response) => {
          this.response.color = "success";
          this.response.message = "Yeah! Senha alterada com sucesso 🔒";
          this.resetUpdatePasswordForm();
          this.setUpdatePasswordSpinner(false);
        })
        .catch((error) => {
          this.response.color = "danger";
          this.response.message = errorCode(error?.response?.data?.error);
          this.resetUpdatePasswordForm();
          this.setUpdatePasswordSpinner(false);
        });
    },
    setUpdatePasswordSpinner(flag) {
      this.spinner.update_password = flag;
    },

    resetUpdatePasswordForm() {
      this.$refs.securityForm.reset();
      this.password = "";
      this.newPassword = "";
      this.newPasswordConfirmation = "";
    },
  },
};
</script>