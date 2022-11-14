<template>
  <form @submit.prevent.stop="submit" class="container">
    <Input
      v-model="v$.form.firstname.$model"
      class="col-md-6"
      label="Prénom"
      :error="v$.form.firstname.$error"
    />
    <Input
      v-model="v$.form.lastname.$model"
      class="col-md-6"
      label="Nom"
      :error="v$.form.lastname.$error"
    />
    <Input
      v-model="v$.form.phone.$model"
      class="col-md-6"
      label="Téléphone"
      type="phone"
      maxLength="10"
      :error="v$.form.phone.$error"
    />
    <Input
      v-model="v$.form.mail.$model"
      class="col-md-6"
      label="Email"
      type="email"
      :error="v$.form.mail.$error"
    />
    <div class="col-md-12">
      <Input
        v-model="v$.form.password.$model"
        class="col-md-6"
        label="Mot de passe"
        type="password"
        :error="v$.form.password.$error"
      />
    </div>
    <Input
      v-model="v$.form.address.$model"
      class="col-md-6"
      label="Adresse"
      :error="v$.form.address.$error"
    />
    <Input
      v-model="v$.form.city.$model"
      class="col-md-4"
      label="Ville"
      :error="v$.form.city.$error"
    />
    <Input
      v-model="v$.form.cityCode.$model"
      class="col-md-2"
      label="Code Postal"
      :error="v$.form.cityCode.$error"
    />
    <Input
      v-model="v$.form.image.$model"
      class="col-md-6"
      label="Image"
      :error="v$.form.image.$error"
    />
    <Input
      v-model="v$.form.birthday.$model"
      type="date"
      class="col-md-6"
      label="Date de naissance"
      :error="v$.form.birthday.$error"
    />
    <Input
      v-model="v$.form.subscriptionType.$model"
      type="select"
      class="col-md-6"
      label="Type d'adhésion"
      :options="adhesionsType"
      :error="v$.form.subscriptionType.$error"
    />
    <Input
      v-model="v$.form.linkTo.$model"
      v-if="isFamily"
      class="col-md-6"
      label="Utilisateur lié"
      placeholder="Sélectionner un utilisateur"
      type="select"
      :options="[
        ...store.getters.users
          .filter((u) => u.id !== form.id && !u.linkTo)
          .map((user) => ({
            value: user.id,
            label: user.firstname + ' ' + user.lastname,
          })),
      ]"
      :error="v$.form.linkTo.$error"
    />

    <div class="col-md-12 modal__footer">
      <button v-if="!user" class="btn" type="submit" :disabled="v$.$invalid">
        Ajouter l'adhérant
      </button>
      <button v-else class="btn" type="submit" :disabled="v$.$invalid">
        modifier l'adhérant
      </button>
    </div>
  </form>
</template>

<script>
import Input from "@/components/Input/Input";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  requiredIf,
} from "@vuelidate/validators";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { defaultInputDate } from "/src/utils.js";
import { computed } from "@vue/runtime-core";

export default {
  components: { Input },
  props: ["user", "isAdmin", "isFamily", "defaultUser"],
  setup() {
    const store = useStore();
    const adhesionsType = computed(() =>
      store.getters.adhesions?.map((a) => ({ label: a.name, value: a.id }))
    );
    return { store, v$: useVuelidate(), adhesionsType };
  },
  data: function () {
    return {
      form: {
        ...(this.user ?? {}),
        birthday: defaultInputDate(this.user?.birthday),
        roles: this.isAdmin ? null : ["ROLE_ADMIN"],
        linkTo: this.defaultUser?.id ?? ""
      },
    };
  },
  methods: {
    async submit() {
      await this.v$.$touch();
      if (!this.v$.$invalid) {
        if (!this.user) {
          this.store.dispatch("addUser", this.form);
          this.$emit("closeModal");
        } else {
          this.store.dispatch("editUser", this.form);
          this.$emit("closeModal");
        }
      }
    },
  },
  validations() {
    return {
      form: {
        firstname: { required },
        lastname: { required },
        phone: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          numeric,
        },
        mail: { required, email },
        password: {
          required,
        },
        address: { required },
        city: { required },
        cityCode: { required },
        birthday: { minValue: (value) => value < new Date().toISOString() },
        image: {},
        subscriptionType: { required },
        linkTo: {
          required: requiredIf(function () {
            return this.isFamily;
          }),
        },
      },
    };
  },
};
</script>
