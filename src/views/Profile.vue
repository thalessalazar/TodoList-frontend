<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">Meu perfil</div>
    </div>

    <FormFeedBackAlert
      v-if="!!response.message"
      :message="response.message"
      :color="response.color"
    />

    <div class="flex justify-center mb-8">
      <img
        class="w-40 h-40 rounded-full"
        :src="this.user.image_profile"
        alt=""
      />
      <div
        class="w-40 h-40 group hover:bg-blue-500 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-200"
        @click.stop.prevent="openFileSelect"
      >
        <img
          class="hidden group-hover:block w-7"
          src="https://www.svgrepo.com/show/33565/upload.svg"
          alt=""
        />
      </div>
    </div>

    <ValidationObserver
      ref="profileForm"
      tag="form"
      @submit.stop.prevent="update"
    >
      <div class="grid grid-cols-2 gap-4">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="Nome"
          tag="div"
        >
          <label
            for="firstName"
            class="block text-sm text-gray-500 font-medium mb-2"
          >
            Primeiro nome
          </label>

          <input
            id="firstName"
            v-model="firstName"
            type="text"
            placeholder="Digite seu nome"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light rounded-lg border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full appearance-none leading-normal"
          />

          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="Sobrenome"
          tag="div"
        >
          <label
            for="lastName"
            class="block text-sm text-gray-500 font-medium mb-2"
          >
            Sobrenome
          </label>

          <input
            id="lastName"
            v-model="lastName"
            type="text"
            placeholder="Digite seu sobrenome"
            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light rounded-lg border border-gray-900 focus:outline-none focus:border-blue-800 rounded:lg py-3 px-4 block w-full leading-normal"
          />
          <FormFeedBackFieldError :error="errors[0]" />
        </ValidationProvider>

        <div class="col-span-2 rounded-lg">
          <LoadingButton
            :isloading="this.spinner.update_user"
            :text="'SALVAR'"
            :color="'info'"
          />
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormFeedBackAlert from "@/components/Form/FormFeedBackAlert.vue";
import FormFeedBackFieldError from "@/components/Form/FormFeedBackFieldError.vue";
import LoadingButton from "@/components/Form/LoadingButton.vue";
import errorCode from "@/utils/errorCode";

export default {
  name: "profile",
  components: {
    ValidationObserver,
    ValidationProvider,
    FormFeedBackAlert,
    FormFeedBackFieldError,
    LoadingButton,
  },
  mounted() {
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
  },

  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },

  data() {
    return {
      file: null,
      firstName: "",
      lastName: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        update_user: false,
        update_image_profile: false,
      },
    };
  },

  methods: {
    ...mapMutations("user", ["STORE_USER"]),
    async update() {
      const validator = this.$refs.profileForm.validate();
      if (!validator) return;

      this.setUpdateUserSpinner(true);

      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
      };

      await this.$axios
        .put("v1/me/update-profile", payload)
        .then((response) => {
          const user = response.data.data;
          this.$store.commit("user/STORE_USER", user);
          this.response.color = "success";
          this.response.message = "Yeah! Perfil atualizado";
          this.setUpdateUserSpinner(false);
        })
        .catch((error) => {
          this.response.color = "danger";
          this.response.message = errorCode(error?.respponse?.data?.error);
          this.setUpdateUserSpinner(false);
        });
    },
    setUpdateUserSpinner(flag) {
      this.spinner.update_user = flag;
    },
    setUpdateImageProfile(flag) {
      this.update_image_profile = flag;
    },
    openFileSelect() {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        this.file = e.target.files[0];
        this.uploadFile();
      };
      input.click();
    },
    uploadFile() {
      this.setUpdateImageProfile(true);
      const formData = new FormData();
      formData.append("image_profile", this.file);
      this.$axios
        .post("/v1/me/update-image-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          const user = response.data.data;
          this.$store.commit("user/STORE_USER", user);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 422) {
            this.$toast.error(error.response.data.message);
          }
        })
        .finally(() => {
          this.setUpdateImageProfile(false);
        });
    },
  },
};
</script>