<template>
  <form class="container" @submit.prevent.stop="submit">
    <Input
      label="Intitule"
      class="col-md-6"
      v-model="v$.name.$model"
      :error="v$.name.$error"
    />
    <Input
      label="Prix"
      class="col-md-6"
      v-model="v$.price.$model"
      :error="v$.price.$error"
    />
    <Input
      label="Durée (en jours)"
      class="col-md-6"
      v-model="v$.duration.$model"
      :error="v$.duration.$error"
    />
    <div class="col-md-12 modal__footer">
      <button class="btn" :disabled="v$.$invalid">
        Ajouter le type d'adhésion
      </button>
    </div>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, numeric, integer } from "@vuelidate/validators";
import Input from "@/components/Input/Input.vue";
import { useStore } from "vuex";
import { reactive } from "@vue/runtime-core";

export default {
  components: { Input },
  emits: ["closeModal"],
  props: ["adhesion"],
  setup(props, { emit }) {
    const store = useStore();

    const form = reactive({
      id: props.adhesion?.id,
      name: props.adhesion?.name,
      price: props.adhesion?.price,
      duration: props.adhesion?.duration,
    });

    const rules = {
      name: { required },
      price: { required, numeric },
      duration: { required, integer },
    };

    const v$ = useVuelidate(rules, form);

    const submit = async () => {
      if (!v$.$invalid) {
        if (!props.adhesion) store.dispatch("addAdhesion", form);
        else store.dispatch("updateAdhesion", form);
        emit("closeModal");
      }
    };

    return { form, v$, submit };
  },
};
</script>
