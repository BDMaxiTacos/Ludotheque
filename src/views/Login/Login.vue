<template>
  <div>
    <h1>Connexion</h1>

    <form @submit.prevent="login" class="container">
      <Input
        type="email"
        label="Email"
        class="col-md-6"
        v-model="v$.mail.$model"
        :error="v$.mail.$error"
      />
      <Input
        type="password"
        label="Mot de passe"
        class="col-md-6"
        v-model="v$.password.$model"
        :error="v$.password.$error"
      />
      <button class="btn">Me connecter</button>
    </form>
  </div>
</template>

<script>
import Input from "@/components/Input/Input.vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive } from "@vue/reactivity";
import { loginUser } from "@/utils/auth";

export default {
  components: { Input },
  setup() {
    const form = reactive({ mail: "", password: "" });
    const rules = { mail: { required, email }, password: { required } };
    const v$ = useVuelidate(rules, form);

    const login = async () => {
      if (!v$.errors) {
        try {
          loginUser(form);
        } catch (e) {
          console.error(e);
        }
      }
    };
    return { v$, login };
  },
};
</script>
