<template>
  <div>
    <h1>Bienvenue {{ connectedUser?.firstname ?? "" }}</h1>
    <div class="container">
      <NbEmpruntsParJeu class="col-md-6" />
      <NbEmpruntsParCategorie class="col-md-6" />
      <DureeEmpruntParJeu class="col-md-6" />
    </div>
  </div>
</template>
<script>
import NbEmpruntsParJeu from "./components/NbEmpruntsParJeu.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import NbEmpruntsParCategorie from "./components/NbEmpruntsParCategorie.vue";
import DureeEmpruntParJeu from "./components/DureeEmpruntParJeu.vue";

export default {
  components: { DureeEmpruntParJeu, NbEmpruntsParJeu, NbEmpruntsParCategorie },
  setup() {
    const store = useStore();

    const connectedUser = computed(() => store.getters.connectedUser);

    return { connectedUser };
  },
};
</script>
