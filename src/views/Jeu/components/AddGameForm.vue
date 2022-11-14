<template>
  <form @submit.prevent.stop="submit">
    <div class="container">
      <Input
        v-model="v$.form.title.$model"
        class="col-md-6"
        placeholder="Titre"
        label="Nom"
        :error="v$.form.title.$error"
        required
      />
      <Input
        v-model="v$.form.stock.$model"
        class="col-md-6"
        type="number"
        placeholder="12"
        label="Quantité"
        :error="v$.form.stock.$error"
        required
      />
      <Input
        v-model="v$.form.cabinet.$model"
        class="col-md-6"
        placeholder="Armoire"
        label="Armoire"
        :error="v$.form.cabinet.$error"
        required
      />
      <Input
        v-model="v$.form.shelf.$model"
        class="col-md-6"
        placeholder="Etagere"
        label="Étagère"
        :error="v$.form.shelf.$error"
        required
      />
      <Input
        v-model="v$.form.identifier.$model"
        class="col-md-6"
        placeholder="12345"
        label="Identifiant du jeu"
        :error="v$.form.identifier.$error"
        required
      />
      <div class="container col-md-12">
        <Input
          v-model="v$.form.editor.$model"
          type="select"
          class="col-md-6"
          placeholder="Sélectionnez un éditeur"
          label="Editeur"
          :options="[
            { value: 'NEW_EDITOR', label: 'Ajouter un éditeur' },
            ...store.getters.editors.map((editor) => ({
              value: editor.id,
              label: editor.name,
            })),
          ]"
          :error="v$.form.editor.$error"
          required
        />
        <Input
          v-if="form.editor === 'NEW_EDITOR'"
          v-model="v$.form.newEditor.$model"
          class="col-md-6"
          placeholder="Nouvel éditeur"
          label="Nouvel éditeur"
          :error="v$.form.newEditor.$error"
          required
        />
      </div>
      <div class="col-md-12 container">
        <Input
          type="multiselect"
          label="Catégories"
          v-model="v$.form.categories.$model"
          :options="categories"
          mode="tags"
          class="col-md-6"
          searchable
          taggable
          :error="v$.form.categories.$error"
          @search-change="searchCategories"
        />
      </div>
      <div class="container col-md-12">
        <Input
          v-if="form.images.length === 0"
          v-model="form.images[0]"
          class="col-md-6"
          label="Image"
          type="text"
          placeholder="http://monimage.com"
        />
        <Input
          v-else
          v-for="(image, index) in form.images"
          :key="index"
          v-model="form.images[index]"
          class="col-md-6"
          :label="'Image ' + (index + 1)"
          type="text"
          placeholder="http://monimage.com"
        />
        <div class="col-md-12">
          <button @click.prevent.stop="addImage" class="btn">
            <Icon icon="add" :size="18" /> Image
          </button>
        </div>
      </div>
      <Input
        v-model="v$.form.description.$model"
        type="textarea"
        class="col-md-12"
        placeholder="Description"
        label="Description"
        :error="v$.form.description.$error"
        required
      />
    </div>
    <div class="modal__footer">
      <button v-if="!game" class="btn" type="submit" :disabled="v$.$invalid">
        Ajouter le jeu
      </button>
      <button v-else class="btn" type="submit">Modifier le jeu</button>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import Input from "@/components/Input/Input.vue";
import Icon from "@/components/Icon/Icon.vue";
import {
  required,
  minValue,
  requiredIf,
  minLength,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { computed, ref } from "@vue/runtime-core";

export default {
  setup() {
    const store = useStore();
    store.dispatch("getEditors");

    const query = ref("");

    const categories = computed(() =>
      store.getters.searchCategories(query.value).map((categorie) => ({
        value: categorie.id,
        label: categorie.name,
      }))
    );

    const searchCategories = (value) => (query.value = value);

    return {
      store,
      v$: useVuelidate(),
      categories,
      searchCategories,
    };
  },
  data: function () {
    return {
      form: {
        ...this.game,
        editor: this.game?.editor?.id,
        categories: this.game?.categories?.map((c) => c.id) || [],
        images: this.game?.images || [""],
      },
    };
  },
  props: {
    game: {
      type: Object,
      required: false,
    },
  },
  components: { Input, Icon },
  methods: {
    addImage() {
      this.form.images.push("");
    },
    async submit() {
      await this.v$.$touch();
      if (!this.v$.$invalid) {
        if (this.form.editor === "NEW_EDITOR") {
          const newEditor = await this.store.dispatch("addEditor", {
            name: this.form.newEditor,
          });
          this.form.editor = newEditor.id;
        }
        if (!this.game) {
          this.form.images = this.form.images.filter((img) => img !== "");
          this.store.dispatch("addGame", this.form);
          this.$emit("closeModal");
        } else {
          this.store.dispatch("editGame", this.form);
          this.$emit("closeModal");
        }
      }
    },
  },
  validations() {
    return {
      form: {
        title: { required },
        stock: { required, min: minValue(0) },
        cabinet: { required },
        shelf: { required },
        editor: { required },
        categories: { required, min: minLength(1) },
        images: {},
        newEditor: {
          required: requiredIf((_, fields) => fields.editor === "NEW_EDITOR"),
        },
        description: { required },
        identifier: { required },
      },
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
