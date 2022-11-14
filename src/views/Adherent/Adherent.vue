<template>
  <div>
    <div class="page__header">
      <h1>Adhérents</h1>
      <button class="btn" @click="showModal">Ajouter un adhérant</button>
    </div>
    <Modal
      v-if="isModalVisible"
      @closeModal="hideModal"
      title="Ajouter un adhérant"
    >
      <AdherentForm @closeModal="hideModal" />
    </Modal>
    <Datatable
      v-if="users && users.length > 0"
      :headers="headers"
      :body="users"
      @rowClick="rowClick"
      isRowHoverHighlighting
    />
    <NoItem v-else>Aucun utilisateur trouvé</NoItem>
  </div>
</template>
<script>
import Modal from "@/components/Modal/Modal.vue";
import AdherentForm from "./components/AdherentForm.vue";
import Datatable from "@/components/Datatable/Datatable.vue";
import Tag from "@/components/Tag/Tag.vue";
import { useStore } from "vuex";
import router, { routes } from "@/router/index";
import {
  ADHERENT_EMPRUNT_STATUS_EN_COURS,
  ADHERENT_EMPRUNT_STATUS_PAS_EMPRUNT,
  ADHERENT_EMPRUNT_STATUS_RETARD,
} from "./adherent.const";
import ButtonIcon from "../../components/Button/ButtonIcon.vue";
import NoItem from "@/components/NoItem/NoItem.vue";

export default {
  components: { Modal, AdherentForm, Datatable, NoItem },
  setup() {
    const store = useStore();
    const getEmpruntLabelByStatus = (status) => {
      switch (status) {
        case ADHERENT_EMPRUNT_STATUS_PAS_EMPRUNT:
          return "Ok";
        case ADHERENT_EMPRUNT_STATUS_EN_COURS:
          return "Ok";
        case ADHERENT_EMPRUNT_STATUS_RETARD:
          return "En retard";
      }
    };
    return { store, getEmpruntLabelByStatus };
  },
  data: () => ({
    isModalVisible: false,
    headers: [
      { label: "Prénom NOM", value: "fullname" },
      { label: "Mail", value: "mail" },
      { label: "Téléphone", value: "phone" },
      { label: "Actions", value: "actions" },
    ],
  }),
  computed: {
    users: function () {
      const users = this.store.getters.users.map((user) => ({
        fullname: `${user.firstname} ${user.lastname}`,
        mail: user.mail,
        phone: user.phone,
        id: user.id,
        status: {
          children: this.getEmpruntLabelByStatus(user.status),
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
              onClick: this.toLoans,
            },
            {
              icon: "delete",
              onClick: this.deleteItem,
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
      return users.filter((user) => !user.linkTo);
    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    rowClick: function (user) {
      router.push({
        name: routes.adherentDetails,
        params: { id: user.id },
      });
    },
    toLoans: function (user, nonActive) {
      if (!nonActive) {
        router.push({
          name: routes.adherentEmprunts,
          params: { id: user.id },
        });
      }
    },
    deleteItem: function (user, nonActive) {
      if (!nonActive)
        this.store.dispatch("deleteUser", this.store.getters.userById(user.id));
    },
  },
};
</script>
