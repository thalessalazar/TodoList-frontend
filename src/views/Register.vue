<template>
  <div style="height: 300px">
    <LoginMenu />

    <FormFeedBackAlert
      v-if="!!response.message"
      :message="response.message"
      :color="response.color"
    />

    <ValidationObserver
      ref="registerForm"
      tag="form"
      @submit.stop.prevent="register()"
    >
      <div class="grid gap-2">
        <div class="flex">
          <div class="w-1/2 mr-2">
            <ValidationProvider
              rules="required"
              name="Nome"
              v-slot="{ errors }"
            >
              <input
                v-model="firstName"
                type="text"
                placeholder="Digite seu nome"
                class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
              />

              <FormFeedBackFieldError :error="errors[0]" />
            </ValidationProvider>
          </div>

          <div class="w-1/2 ml-2">
            <ValidationProvider
              rules="required"
              name="Sobrenome"
              v-slot="{ errors }"
            >
              <input
                v-model="lastName"
                type="text"
                placeholder="Digite seu sobrenome"
                class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
              />

              <FormFeedBackFieldError :error="errors[0]" />
            </ValidationProvider>
          </div>
        </div>

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
          vid="password"
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
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />
          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required|confirmed:password"
          name="Confirmação de Senha"
        >
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />
          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <LoadingButton
          :isloading="this.spinner.register"
          :text="'CADASTRAR'"
          :color="'info'"
        />
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import LoginMenu from "@/components/Auth/LoginMenu.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormFeedBackFieldError from "@/components/Form/FormFeedBackFieldError.vue";
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import LoadingButton from "../components/Form/LoadingButton.vue";
import errorCode from "@/utils/errorCode";

export default {
  name: "Register",
  components: {
    LoginMenu,
    ValidationObserver,
    ValidationProvider,
    LoadingButton,
    FormFeedBackFieldError,
    FormFeedBackAlert,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        register: false,
      },
    };
  },
  methods: {
    async register() {
      const validator = await this.$refs.registerForm.validate();

      if (!validator) return;

      this.resetResponse();

      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword,
      };

      this.setRegisterSpinner(true);

      this.$axios
        .post("/v1/register", payload)
        .then((response) => {
          this.response.color = "success";
          this.response.message = "Seu cadastro foi feito com sucesso.";
          this.setRegisterSpinner(false);
          this.resetForm();
        })
        .catch((error) => {
          this.setRegisterSpinner(false);

          this.response.color = "danger";
          this.response.message = errorCode(error?.response?.data?.error);
        });
    },
    setRegisterSpinner(flag) {
      this.spinner.register = flag;
    },
    resetResponse() {
      this.response = {
        color: "",
        message: "",
      };
    },

    resetForm() {
      this.$refs.registerForm.reset();
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
};
</script>

<style>
</style>