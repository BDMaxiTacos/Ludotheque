<template>
  <div>
    <h1>Editeurs</h1>
    <button @click="showModal" class="btn">Ajouter un éditeur</button>
    <Datatable
      v-if="mappedEditeurs?.length !== 0"
      :headers="headers"
      :body="mappedEditeurs"
    />
    <NoItem v-else>Aucun éditeur trouvé</NoItem>
    <Modal
      v-if="isModalVisible"
      title="Créer un éditeur"
      @closeModal="hideModal"
    >
      <EditeurForm @closeModal="hideModal" :editor="editorToUpdate" />
    </Modal>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Datatable from "@/components/Datatable/Datatable.vue";
import NoItem from "@/components/NoItem/NoItem.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import { computed, ref } from "vue";
import EditeurForm from "./components/EditeurForm.vue";
import Modal from "@/components/Modal/Modal.vue";
export default {
  components: { Datatable, NoItem, EditeurForm, Modal },
  setup() {
    const store = useStore();

    const isModalVisible = ref(false);
    const editorToUpdate = ref(null);

    const showModal = () => (isModalVisible.value = true);
    const hideModal = () => {
      isModalVisible.value = false;
      editorToUpdate.value = null;
    };

    const headers = [
      { label: "Nom de l'éditeur", value: "name" },
      { label: "Nombre de jeux", value: "count" },
      { label: "Actions", value: "actions" },
    ];

    const deleteEditor = (editor) => {
      const hasConfirm = confirm(
        `Êtes vous sur de vouloir supprimer l'éditeur \n "${editor.name}"`
      );
      if (hasConfirm) store.dispatch("deleteEditor", editor.id);
    };

    const mappedEditeurs = computed(() =>
      store.getters.editors.map((editor) => {
        const count = store.getters.nbGamesPerEditors(editor.id);
        return {
          name: editor.name,
          count: count,
          id: editor.id,
          actions: {
            component: ButtonIcon,
            actions: [
              {
                icon: "delete",
                onClick: deleteEditor,
                nonActive: count > 0,
              },
              {
                icon: "edit",
                onClick: (editor) => {
                  editorToUpdate.value = editor;
                  showModal();
                },
              },
            ],
          },
        };
      })
    );

    return {
      headers,
      mappedEditeurs,
      showModal,
      hideModal,
      isModalVisible,
      editorToUpdate,
    };
  },
};
</script>
