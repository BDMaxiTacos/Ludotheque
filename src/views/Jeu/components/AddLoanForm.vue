<template>
  <form @submit.prevent.stop="submit">
    <div class="container">
      <Input
        v-model="v$.form.user.$model"
        class="col-md-6"
        label="Utilisateur"
        placeholder="Sélectionner un utilisateur"
        type="select"
        :options="[
          ...store.getters.users.map((user) => ({
            value: user,
            label: user.firstname + ' ' + user.lastname,
          })),
        ]"
        :error="v$.form.user.$error"
        required
      />
      <Input
        v-model="v$.form.game.$model"
        class="col-md-6"
        type="hidden"
        :error="v$.form.game.$error"
        required
      />
      <Input
        v-model="v$.form.loanDate.$model"
        type="date"
        class="col-md-6"
        label="Date d'emprunt"
        :error="v$.form.loanDate.$error"
      />
      <Input
        v-model="v$.form.limitReturnDate.$model"
        type="date"
        class="col-md-6"
        label="Date retour limite"
        :error="v$.form.limitReturnDate.$error"
      />
    </div>
    <div class="modal__footer">
      <button class="btn" type="submit" :disabled="v$.$invalid">
        Emprunter le jeu
      </button>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import Input from "@/components/Input/Input.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const store = useStore();
    store.dispatch("getUsers");
    return { store, v$: useVuelidate() };
  },
  data: function () {
    return {
      form: {
        game: this.game,
        user: "",
        loanDate: new Date().toISOString().substr(0, 10),
        limitReturnDate: new Date().toISOString().substr(0, 10),
      },
    };
  },
  props: {
    game: {
      type: Object,
      required: false,
    },
  },
  components: { Input },
  methods: {
    async submit() {
      await this.v$.$touch();
      if (!this.v$.$invalid) {
        this.store.dispatch("addLoan", this.form);
        this.$emit("closeModal");
      }
    },
  },
  validations() {
    return {
      form: {
        user: { required },
        game: { required },
        loanDate: { required },
        limitReturnDate: { required },
      },
    };
  },
};
</script>
