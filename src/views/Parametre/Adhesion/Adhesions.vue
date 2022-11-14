<template>
  <div>
    <h1>Types d'adhésions</h1>
    <button class="btn" @click="showModal">Ajouter un type d'adhésion</button>
    <Datatable
      v-if="mappedAdhesions?.length > 0"
      :headers="headers"
      :body="mappedAdhesions"
      :key="mappedAdhesions"
    />
    <NoItem v-else>Aucun type d'adhésion trouvé</NoItem>
    <Modal
      v-if="isModalVisible"
      title="Ajouter un type d'adhésion"
      @closeModal="hideModal"
    >
      <AdhesionForm @closeModal="hideModal" :adhesion="adhesionToUpdate" />
    </Modal>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Datatable from "@/components/Datatable/Datatable.vue";
import NoItem from "@/components/NoItem/NoItem.vue";
import Modal from "@/components/Modal/Modal.vue";
import AdhesionForm from "./components/AdhesionForm.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";

export default {
  components: { Datatable, NoItem, Modal, AdhesionForm },
  setup() {
    const store = useStore();

    const isModalVisible = ref(false);
    const adhesionToUpdate = ref(null);
    const adhesions = computed(() => store.getters.adhesions);

    const showModal = () => (isModalVisible.value = true);
    const hideModal = () => {
      isModalVisible.value = false;
      adhesionToUpdate.value = null;
    };

    const headers = [
      { label: "Intitule", value: "name" },
      { label: "Prix", value: "price" },
      { label: "Durée (en jours)", value: "duration" },
      { label: "actions", value: "actions" },
    ];

    const deleteAdhesion = (adhesion) => {
      const ok = confirm(
        `Êtes vous sur de vouloir supprimer le type d'adhésion \n ${adhesion.name}`
      );
      if (ok) store.dispatch("deleteAdhesion", adhesion.id);
    };

    const mappedAdhesions = computed(() =>
      adhesions?.value.map((adhesion) => ({
        ...adhesion,
        actions: {
          component: ButtonIcon,
          actions: [
            {
              icon: "edit",
              onClick: (adhesion) => {
                adhesionToUpdate.value = adhesion;
                showModal();
              },
            },
            { icon: "delete", onClick: deleteAdhesion },
          ],
        },
      }))
    );

    return {
      headers,
      adhesions,
      isModalVisible,
      showModal,
      hideModal,
      adhesionToUpdate,
      mappedAdhesions,
    };
  },
};
</script>
