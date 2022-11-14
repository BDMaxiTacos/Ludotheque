<template>
  <form @submit.prevent.stop="submit" class="container">
    <Input
      v-model="v$.form.name.$model"
      label="Nom de l'éditeur"
      class="col-md-6"
      :error="v$.form.name.$error"
    />
    <div class="col-md-12 modal__footer">
      <button class="btn" @click="submit" :disabled="v$.$invalid">
        Submit
      </button>
    </div>
  </form>
</template>
<script>
import Input from "@/components/Input/Input";
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

export default {
  components: { Input },
  props: ["editor"],
  setup() {
    const store = useStore();
    return { store, v$: useVuelidate() };
  },
  methods: {
    async submit() {
      await this.v$.$touch();
      if (!this.v$.$invalid) {
        if (!this.editor) {
          this.store.dispatch("addEditor", this.form);
        } else {
          this.store.dispatch("updateEditor", this.form);
        }
        this.$emit("closeModal");
      }
    },
  },
  data: function () {
    return {
      form: {
        id: this.editor?.id,
        name: this.editor?.name,
      },
    };
  },
  validations() {
    return {
      form: {
        name: { required },
      },
    };
  },
};
</script>
