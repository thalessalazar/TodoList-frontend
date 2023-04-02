<template>
  <div>
    <div v-if="!this.tokenIsValid" class="text-center items-center flex-row">
      <img
        v-if="this.spinner.checkingVerifyToken && this.resetPassword"
        src="@/assets/img/spinner.svg"
        alt=""
        class="inline-flex w-7 h-7"
      />

      <FormFeedBackAlert
        v-if="!!response.message"
        :message="response.message"
        :color="response.color"
      />
      <RouterLink
        v-if="passwordReseted"
        :to="{ path: '/' }"
        class="text-sm font-light"
      >
        Login
      </RouterLink>
    </div>

    <div v-else>
      <h3 class="py-2 mb-8 text-gray-500 text-lg font-medium text-center">
        Redefinição de senha
      </h3>

      <FormFeedBackAlert
        v-if="!!response.message"
        :message="response.message"
        :color="response.color"
      />

      <ValidationObserver
        ref="resetPasswordForm"
        tag="form"
        @submit.stop.prevent="resetPassword()"
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

          <ValidationProvider
            vid="newPassword"
            v-slot="{ errors }"
            :rules="{
              required: true,
              regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
              min: 8,
              max: 30,
            }"
            name="Senha"
          >
            <input
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
            <input
              v-model="newPasswordConfirmation"
              type="password"
              placeholder="Confirme sua senha"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
            />
            <FormFeedBackFieldError :error="errors[0]" />
          </ValidationProvider>

          <LoadingButton
            :isloading="this.spinner.resetPassword"
            :text="'REDEFINIR SENHA'"
            :color="'info'"
          />

          <div class="my-4 text-center">
            <RouterLink :to="{ name: 'login' }" class="text-sm font-light">
              Login
            </RouterLink>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormFeedBackFieldError from "@/components/Form/FormFeedBackFieldError.vue";
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import LoadingButton from "@/components/Form/LoadingButton.vue";
import errorCode from "@/utils/errorCode";

export default {
  beforeRouteEnter(to, from, next) {
    if (!to?.query?.token) {
      next({ name: "login" });
    }

    next();
  },
  created() {
    this.token = this.$route?.query?.token || "";
    this.verifyForgotPasswordToken();
  },
  data() {
    return {
      response: {
        color: "",
        message: "",
      },
      spinner: {
        checkingVerifyToken: true,
        resetPassword: false,
      },
      tokenIsValid: false,
      passwordReseted: false,
      email: "",
      newPassword: "",
      newPasswordConfirmation: "",
      token: "",
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    FormFeedBackAlert,
    FormFeedBackFieldError,
    LoadingButton,
  },
  methods: {
    resetPassword() {},
    verifyForgotPasswordToken() {
      const payload = {
        token: this.token,
      };

      this.setCheckingVerifyTokenSpinner(true);

      this.$axios
        .post("/v1/verify-forgot-password-token", payload)
        .then((response) => {
          this.tokenIsValid = true;
          this.setCheckingVerifyTokenSpinner(false);
        })
        .catch((error) => {
          this.setCheckingVerifyTokenSpinner(false);
          this.$router.push("/login");
        });
    },

    resetPassword() {
      const validator = this.$refs.resetPasswordForm.validate();
      if (!validator) return;

      const payload = {
        token: this.token,
        email: this.email,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
      };

      this.setResetPasswordSpinner(true);

      this.$axios
        .post("/v1/reset-password", payload)
        .then((response) => {
          this.setResetPasswordSpinner(false);
          this.passwordReseted = true;
          this.tokenIsValid = false;
          this.response.color = "success";
          this.response.message = "Senha redefinida com sucesso.";
          this.setCheckingVerifyTokenSpinner(false);
        })
        .catch((error) => {
          this.setResetPasswordSpinner(false);
          this.setCheckingVerifyTokenSpinner(false);
          this.response.color = "danger";
          this.response.message = errorCode(error?.response?.data?.error);
        }); 
    },

    setCheckingVerifyTokenSpinner(flag) {
      this.checkingVerifyToken = flag;
    },
    setResetPasswordSpinner(flag) {
      this.resetPassword = flag;
    },
  },
};
</script>