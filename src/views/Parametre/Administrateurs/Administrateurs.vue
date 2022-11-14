<template>
  <div>
    <div class="page__header">
      <h1>Administrateurs</h1>
      <button class="btn" @click="showModal">Ajouter un administrateur</button>
    </div>
    <div>
      <Datatable
        :headers="headers"
        :body="admins"
        @rowClick="rowClick"
        isRowHoverHighlighting
      />
    </div>
    <Modal
      v-if="isModalVisible"
      @closeModal="hideModal"
      title="Ajouter un administrateur"
    >
      <AdherentForm @closeModal="hideModal" isAdmin />
    </Modal>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import Datatable from "@/components/Datatable/Datatable.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import router, { routes } from "@/router/index";
import AdherentForm from "../../Adherent/components/AdherentForm.vue";
import Modal from "@/components/Modal/Modal.vue";

export default {
  components: {
    Datatable,
    AdherentForm,
    Modal,
  },
  setup() {
    const isModalVisible = ref(false);
    const hideModal = () => (isModalVisible.value = false);
    const showModal = () => (isModalVisible.value = true);
    const deleteUser = (user) => {
      const hasConfirm = confirm(
        "Êtes-vous sur de vouloir supprimer cet administrateur ?"
      );
      if (hasConfirm)
        store.dispatch("deleteUser", store.getters.userById(user.id));
    };

    const store = useStore();
    const admins = computed(() =>
      store.getters.administrators?.map((user) => ({
        fullname: `${user.firstname} ${user.lastname}`,
        mail: user.mail,
        phone: user.phone,
        id: user.id,
        actions: {
          component: ButtonIcon,
          actions: [
            {
              icon: "delete",
              onClick: deleteUser,
            },
          ],
        },
      }))
    );

    const rowClick = (user) => {
      router.push({
        name: routes.adherentDetails,
        params: { id: user.id },
      });
    };

    const headers = [
      { label: "Prénom NOM", value: "fullname" },
      { label: "Mail", value: "mail" },
      { label: "Téléphone", value: "phone" },
      { label: "Actions", value: "actions" },
    ];

    return { admins, headers, rowClick, isModalVisible, hideModal, showModal };
  },
};
</script>
