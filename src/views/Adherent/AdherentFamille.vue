<template>
  <div>
    <div class="page__header">
      <h1>Famille</h1>
      <button class="btn" @click="showModal">Ajouter un adhérant</button>
    </div>
    <Modal
      v-if="isModalVisible"
      @closeModal="hideModal"
      title="Ajouter un adhérant"
    >
      <AdherentForm @closeModal="hideModal" :isFamily="true" :defaultUser="selectedUser" />
    </Modal>
    <Datatable
      v-if="familyMembers?.length > 0"
      :headers="headers"
      :body="familyMembers"
      @rowClick="rowClick"
      isRowHoverHighlighting
    />
    <NoItem v-else>Aucun utilisateur trouvé</NoItem>
  </div>
</template>
<script>
import { ref } from "vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import router, { routes } from "@/router/index";

import NoItem from "@/components/NoItem/NoItem.vue";
import Modal from "@/components/Modal/Modal.vue";
import AdherentForm from "./components/AdherentForm.vue";
import Datatable from "@/components/Datatable/Datatable.vue";
import Tag from "@/components/Tag/Tag.vue";
import ButtonIcon from "../../components/Button/ButtonIcon.vue";

import {
  ADHERENT_EMPRUNT_STATUS_EN_COURS,
  ADHERENT_EMPRUNT_STATUS_PAS_EMPRUNT,
  ADHERENT_EMPRUNT_STATUS_RETARD,
} from "./adherent.const";

export default {
  components: { Modal, AdherentForm, Datatable, NoItem },
  setup() {
    const store = useStore();
    const route = useRoute();

    const getEmpruntLabelByStatus = (status) => {
      switch (status) {
        case ADHERENT_EMPRUNT_STATUS_PAS_EMPRUNT:
          return "Pas d'emprunt";
        case ADHERENT_EMPRUNT_STATUS_EN_COURS:
          return "En cours";
        case ADHERENT_EMPRUNT_STATUS_RETARD:
          return "En retard";
      }
    };

    const familyMembers = computed(() => {
      let users = store.getters.familyMembers(route.params.id);
      return users.map((user) => ({
        fullname: `${user.firstname} ${user.lastname}`,
        mail: user.mail,
        phone: user.phone,
        id: user.id,
        status: {
          children: getEmpruntLabelByStatus(user.status),
          component: Tag,
          props: {
            class: {
              "--green":
                user.status === ADHERENT_EMPRUNT_STATUS_EN_COURS ||
                user.status === ADHERENT_EMPRUNT_STATUS_PAS_EMPRUNT,
              "--red": user.status === ADHERENT_EMPRUNT_STATUS_RETARD,
            },
          },
        },
        actions: {
          component: ButtonIcon,
          actions: [
            {
              icon: "shopping_bag",
              onClick: toLoans,
            },
            {
              icon: "delete",
              onClick: deleteItem,
              nonActive:
                user.loans &&
                user.loans.filter(
                  (loan) =>
                    loan.status === ADHERENT_EMPRUNT_STATUS_RETARD ||
                    loan.status === ADHERENT_EMPRUNT_STATUS_EN_COURS
                ).length > 0,
            },
          ],
        },
      }));
    });

    let isModalVisible = ref(false);

    const rowClick = function (user) {
      router.push({
        name: routes.adherentDetails,
        params: { id: user.id },
      });
    };

    let headers = [
      { label: "Prénom NOM", value: "fullname" },
      { label: "Mail", value: "mail" },
      { label: "Téléphone", value: "phone" },
      { label: "Statut", value: "status" },
      { label: "Actions", value: "actions" },
    ];

    const showModal = function () {
      isModalVisible.value = true;
    };
    const hideModal = function () {
      isModalVisible.value = false;
    };

    const toLoans = function (user, nonActive) {
      if (!nonActive) {
        router.push({
          name: routes.adherentEmprunts,
          params: { id: user.id },
        });
      }
    };
    const deleteItem = function (user, nonActive) {
      if (!nonActive)
        store.dispatch("deleteUser", this.store.getters.userById(user.id));
    };

    const selectedUser = store.getters.userById(route.params.id);

    return {
      rowClick,
      showModal,
      hideModal,
      isModalVisible,
      familyMembers,
      headers,
      selectedUser
    };
  },
};
</script>
