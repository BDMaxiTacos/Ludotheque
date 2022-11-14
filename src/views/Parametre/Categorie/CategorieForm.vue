<template>
  <form @submit.prevent.stop="submit" class="container">
    <Input
      v-model="v$.name.$model"
      label="Nom de la catégorie"
      class="col-md-6"
      :error="v$.name.$error"
    />
    <div class="col-md-12">
      <button :disabled="v$.$invalid" class="btn">Ajouter la catégorie</button>
    </div>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import Input from "@/components/Input/Input.vue";
import { required } from "@vuelidate/validators";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  components: { Input },
  setup(_, { emit }) {
    const store = useStore();
    const form = reactive({
      name: "",
    });

    const rules = {
      name: { required },
    };

    const submit = () => {
      store.dispatch("addCategorie", form);
      emit("closeModal");
    };

    const v$ = useVuelidate(rules, form);

    return { v$, submit };
  },
};
</script>
