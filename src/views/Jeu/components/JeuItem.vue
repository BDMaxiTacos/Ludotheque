<template>
  <div class="jeu-item container">
    <img
      v-if="game.images.length > 0"
      :src="game.images[0]"
      alt="image de jeu"
      class="jeu-item-image col-md-2"
    />
    <img
      v-else
      src="../../../assets/images/image_placeholder.png"
      alt=""
      class="jeu-item-image col-md-2"
    />
    <div class="jeu-item-content col-md-10">
      <div class="jeu-item__header">
        <h2 class="jeu-item-title">{{ game.title }}</h2>
        <span v-if="isLoggedIn()">
          <Icon class="jeu-item__edit-icon" icon="edit" @click="editGame" />
          <Icon
            class="jeu-item__delete-icon"
            icon="delete"
            @click="deleteGame"
          />
        </span>
      </div>
      <p class="jeu-item-description">{{ game.description }}</p>
      <div class="container">
        <div class="container col-md-8">
          <p :key="cat.id" v-for="cat in game.categories" class="col-md-3 col-sm-12">
            <strong>{{cat.name}}</strong>
          </p>
          
        </div>
        <p class="col-md-2 jeu-properties-space"></p>
        <button
          v-if="game.stock > 0 && isLoggedIn()"
          @click="addLoanStart"
          class="col-md-2 jeu-availability btn col-sm-12"
        >
          Emprunter
        </button>
        <p
          v-else-if="game.stock > 0 && !isLoggedIn()"
          class="col-md-2 jeu-availability none col-sm-12"
        >
          <Icon
            class="jeu-item__glass-icon"
            icon="hourglass_empty"
            @click="editGame"
          />
          Disponible
        </p>
        <p v-else class="col-md-2 jeu-availability none col-sm-12">
          <Icon
            class="jeu-item__glass-icon"
            icon="hourglass_empty"
            @click="editGame"
          />
          Indisponible
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon/Icon";
import { useStore } from "vuex";
import { isLoggedIn } from "@/utils/auth";

export default {
  name: "JeuItem",
  setup() {
    const store = useStore();

    return { store, isLoggedIn };
  },
  components: { Icon },
  props: { game: { type: Object, required: true } },
  methods: {
    deleteGame: function () {
      const hasConfirm = confirm(
        `Êtes vous sur de vouloir supprimer le jeu \n "${this.game.title}"`
      );
      if (hasConfirm) {
        this.store.dispatch("deleteGame", this.game.id);
      }
    },
    editGame() {
      this.$emit("editGame", this.game);
    },
    addLoanStart() {
      this.$emit("addLoanStart", this.game);
    },
  },
};
</script>
