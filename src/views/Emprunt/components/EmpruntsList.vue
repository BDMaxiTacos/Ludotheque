<template>
  <Datatable
    v-if="loans && loans.length > 0"
    :headers="headers"
    :body="formatedLoans"
  />
  <NoItem v-else>Aucun emprunt trouvé</NoItem>
</template>

<script>
import Datatable from "@/components/Datatable/Datatable.vue";
import { computed } from "@vue/runtime-core";
import UserWithIconVue from "./UserWithIcon.vue";
import { formatDate } from "@/utils.js";
import Tag from "../../../components/Tag/Tag.vue";
import NoItem from "../../../components/NoItem/NoItem.vue";
import {
  EMPRUNT_STATUS_ENCOURS,
  EMPRUNT_STATUS_RETARD,
  EMPRUNT_STATUS_TERMINE,
} from "../emprunts.const";
import ButtonIcon from "../../../components/Button/ButtonIcon.vue";
import { useStore } from "vuex";

export default {
  components: { Datatable, NoItem },
  props: {
    loans: { type: Array, required: true },
    isLight: Boolean,
  },
  setup(props) {
    const store = useStore();
    const headers = [
      { label: "Jeu", value: "game" },
      { label: "Utilisateur", value: "user" },
      { label: "Date emprunt", value: "loanDate" },
      { label: "Date retour prévue", value: "limitReturnDate" },
      { label: "Statut", value: "status" },
      { label: "Actions", value: "actions" },
    ];

    const headersLight = [
      { label: "Jeu", value: "game" },
      { label: "Date emprunt", value: "loanDate" },
      { label: "Date retour prévue", value: "limitReturnDate" },
      { label: "Statut", value: "status" },
      { label: "Actions", value: "actions" },
    ];

    const getEmpruntLabelByStatus = (status) => {
      switch (status) {
        case EMPRUNT_STATUS_ENCOURS:
          return "En cours";
        case EMPRUNT_STATUS_RETARD:
          return "En retard";
        case EMPRUNT_STATUS_TERMINE:
          return "Terminé";
      }
    };

    const getEmpruntOrderByStatus = (status) => {
      switch (status) {
        case EMPRUNT_STATUS_ENCOURS:
          return 1;
        case EMPRUNT_STATUS_RETARD:
          return 0;
        case EMPRUNT_STATUS_TERMINE:
          return 2;
      }
    };

    const returnGame = (loan, nonActive) => {
      if (!nonActive) {
        if (confirm("Valider le retour du jeu?")) {
          loan = store.getters.loanById(loan.id);
          loan.returnDate = Date.now();
          loan.status = "RENDU";
          store.dispatch("editLoan", loan);
        }
      }
    };

    const deleteItem = (loan, nonActive) => {
      if (!nonActive) {
        if (confirm("Valider la suppression de l'emprunt?")) {
          store.dispatch("deleteLoan", store.getters.loanById(loan.id));
        }
      }
    };

    const formatLoans = (_loans) =>
      _loans
        ?.map((loan) => ({
          ...loan,
          user:
            (loan.user && {
              children: {
                ...loan.user,
                fullname: `${loan.user?.firstname} ${loan.user?.lastname}`,
                id: loan.user?._id,
              },
              component: UserWithIconVue,
            }) ||
            "Utilisateur supprimé",
          game: loan.game.title,
          loanDate: formatDate(new Date(loan.loanDate)),
          limitReturnDate: formatDate(new Date(loan.limitReturnDate)),
          returnDate: loan.returnDate
            ? formatDate(new Date(loan.returnDate))
            : null,
          status: {
            children: getEmpruntLabelByStatus(loan.status),
            component: Tag,
            props: {
              class: {
                "--green": loan.status === EMPRUNT_STATUS_ENCOURS,
                "--blue": loan.status === EMPRUNT_STATUS_TERMINE,
                "--red": loan.status === EMPRUNT_STATUS_RETARD,
              },
            },
            order: getEmpruntOrderByStatus(loan.status),
          },
          actions: {
            component: ButtonIcon,
            actions: [
              {
                icon: "forward",
                onClick: returnGame,
                nonActive:
                  !!loan.returnDate || loan.status === EMPRUNT_STATUS_TERMINE,
              },
              {
                icon: "delete",
                onClick: deleteItem,
                nonActive: !(
                  !!loan.returnDate || loan.status === EMPRUNT_STATUS_TERMINE
                ),
              },
            ],
          },
        }))
        .sort((a, b) => a.status.order - b.status.order);

    const formatedLoans = computed(() => formatLoans(props.loans));

    return {
      headers: props.isLight ? headersLight : headers,
      formatedLoans,
    };
  },
};
</script>
