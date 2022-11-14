<template>
  <div>
    <Modal
      v-if="isModalVisible"
      title="Ajouter une catégorie"
      @closeModal="hideModal"
    >
      <CategorieForm @closeModal="hideModal" />
    </Modal>
    <div class="page__header">
      <h1>Catégories</h1>
      <button class="btn" @click="showModal">Ajouter une catégorie</button>
    </div>
    <Datatable :headers="headers" :body="categories" />
  </div>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import Datatable from "@/components/Datatable/Datatable.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import Modal from "@/components/Modal/Modal.vue";
import CategorieForm from "./CategorieForm.vue";

export default {
  components: { Datatable, Modal, CategorieForm },
  setup() {
    const isModalVisible = ref(false);
    const showModal = () => (isModalVisible.value = true);
    const hideModal = () => (isModalVisible.value = false);

    const deleteCategorie = (categorie) => {
      const hasConfirm = confirm(
        "Êtes-vous sur de vouloir supprimer cette catégorie ?"
      );
      if (hasConfirm) store.dispatch("deleteCategorie", categorie.id);
    };
    const store = useStore();
    const headers = [
      { label: "Nom de la catégorie", value: "name" },
      { label: "Actions", value: "actions" },
    ];
    const categories = computed(() =>
      store.getters.categories?.map((cat) => ({
        name: cat.name,
        id: cat.id,
        actions: {
          component: ButtonIcon,
          actions: [{ icon: "delete", onClick: deleteCategorie }],
        },
      }))
    );
    return { headers, categories, isModalVisible, hideModal, showModal };
  },
};
</script>
