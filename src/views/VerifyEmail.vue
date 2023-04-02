<template>
  <div class="flex justify-center">
    <img
      v-if="this.spinner.verify_email"
      src="@/assets/img/spinner.svg"
      alt=""
      class="inline-flex w-7 h-7"
    />
    <FormFeedBackAlert
      v-if="!!response.message"
      :message="response.message"
      :color="response.color"
    />
  </div>
</template>

<script>
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import errorCode from "@/utils/errorCode";

export default {
  name: "verifyEmail",
  components: {
    FormFeedBackAlert,
  },
  data() {
    return {
      token: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        verify_email: false,
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!to?.query?.token) {
      next({ name: "login" });
    }

    next();
  },

  created() {
    this.token = this.$route?.query?.token || "";
    this.verifyEmail();
  },
  methods: {
    verifyEmail() {
      const payload = {
        token: this.token,
      };

      this.setVerifyEmailSpinner(true);

      this.$axios
        .post("/v1/verify-email", payload)
        .then((response) => {
          this.response.color = "success";
          this.response.message = "E-mail verificado com sucesso.";
        })
        .catch((error) => {
          this.response.color = "danger";
          this.response.message = errorCode(error?.response?.data?.error);
        })
        .finally(() => {
          this.setVerifyEmailSpinner(false);
        });
    },

    setVerifyEmailSpinner(flag) {
      this.spinner.verify_email = flag;
    },
  },
};
</script>