<template>
  <div style="height: 300px">
    <!-- Auth menu -->
    <LoginMenu />

    <FormFeedBackAlert
      v-if="!!response.message"
      :message="response.message"
      :color="response.color"
    />

    <ValidationObserver
      ref="loginForm"
      tag="form"
      @submit.stop.prevent="login()"
    >
      <!-- Login form -->
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

        <ValidationProvider v-slot="{ errors }" rules="required" name="Senha">
          <input
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />
          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <LoadingButton
          :isloading="this.spinner.login"
          :text="'ENVIAR'"
          :color="'info'"
        />

        <div class="my-4 text-center">
          <RouterLink
            :to="{ path: '/forgot-password' }"
            class="text-sm font-light"
          >
            Esqueci minha senha
          </RouterLink>
        </div>
      </div>
    </ValidationObserver>
    <!--/ Login form -->
  </div>
</template>

<script>
import LoginMenu from "@/components/Auth/LoginMenu.vue";
import Cookie from "@/service/cookie.js";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormFeedBackFieldError from "@/components/Form/FormFeedBackFieldError.vue";
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import LoadingButton from "@/components/Form/LoadingButton.vue";
import errorCode from "@/utils/errorCode";
import { RouterLink } from "vue-router";

export default {
  name: "Login",
  components: {
    LoginMenu,
    ValidationObserver,
    ValidationProvider,
    FormFeedBackFieldError,
    FormFeedBackAlert,
    LoadingButton,
    RouterLink,
  },
  data() {
    return {
      email: "",
      password: "",
      response: {
        color: "red",
        message: "",
      },
      spinner: {
        login: false,
      },
    };
  },
  methods: {
    async login() {
      const validator = await this.$refs.loginForm.validate();

      if (!validator) return;

      const payload = {
        email: this.email,
        password: this.password,
      };

      this.resetResponse();

      this.setLoginSpinner(true);

      this.$axios
        .post("/v1/login", payload)
        .then((response) => {
          const data = response.data;
          const token = `${data.token_type} ${data.access_token}`;
          Cookie.setToken(token);

          const user = response.data.data;

          this.$store.commit("user/STORE_USER", user);
          this.setLoginSpinner(false);
          this.$router.push({name: "index"});
        })
        .catch((error) => {
          this.setLoginSpinner(false);

          this.response.color = "danger";
          this.response.message = errorCode(error?.response?.data?.error);
        });
    },

    setLoginSpinner(flag) {
      this.spinner.login = flag;
    },

    resetResponse() {
      this.response = {
        color: "",
        message: "",
      };
    },
  },
};
</script>

<style>
</style>