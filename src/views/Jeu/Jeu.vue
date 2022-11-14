<template>
  <div class="jeu">
    <div class="page__header">
      <div class="container">
        <div class="col-md-9">
          <h1>Jeux</h1>
          <button v-if="isLoggedIn()" class="btn" @click="displayModal()">
            Ajouter un jeu
          </button>
        </div>
        <div class="col-md-3">
          <Input
            v-model="query"
            type="text"
            placeholder="Ex: monopoly, 123 (identifiant)..."
            label="Rechercher"
          />
        </div>
      </div>
    </div>
    <Modal
      @closeModal="closeModal"
      v-if="isModalVisible"
      :title="gameToEdit ? 'Modifier le jeu' : 'Ajouter un jeu'"
    >
      <Form :game="gameToEdit" @closeModal="closeModal" />
    </Modal>
    <!-- loan -->
    <Modal
      @closeModal="closeAddLoan"
      v-if="isLoanToAdd"
      :title="`Emprunter &quot${loanToAdd.title}&quot`"
    >
      <LoanForm :game="loanToAdd" @closeModal="closeAddLoan" />
    </Modal>
    <div v-if="games.length > 0">
      <JeuItem
        v-for="game in games"
        :key="game.id"
        :game="game"
        @editGame="displayModal"
        @addLoanStart="displayAddLoan"
      />
    </div>
    <NoItem v-else>Aucun jeu trouvé</NoItem>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
import Form from "./components/AddGameForm.vue";
import LoanForm from "./components/AddLoanForm.vue";
import { useStore } from "vuex";
import JeuItem from "./components/JeuItem";
import Input from "@/components/Input/Input.vue";
import { computed, ref } from "vue";
import NoItem from "../../components/NoItem/NoItem.vue";
import { isLoggedIn } from "@/utils/auth";

export default {
  components: { Modal, Form, JeuItem, LoanForm, Input, NoItem },
  setup() {
    const store = useStore();

    const query = ref("");
    const games = computed(() => store.getters.searchGame(query.value));
    const isModalVisible = ref(false);
    const isLoanToAdd = ref(false);
    const gameToEdit = ref(null);
    const loanToAdd = ref(null);

    const displayModal = (game) => {
      gameToEdit.value = game;
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const displayAddLoan = (game) => {
      loanToAdd.value = game;
      isLoanToAdd.value = true;
    };

    const closeAddLoan = () => {
      isLoanToAdd.value = false;
    };

    return {
      store,
      query,
      games,
      isModalVisible,
      isLoanToAdd,
      gameToEdit,
      loanToAdd,
      displayModal,
      closeModal,
      displayAddLoan,
      closeAddLoan,
      isLoggedIn,
    };
  },
};
</script>
