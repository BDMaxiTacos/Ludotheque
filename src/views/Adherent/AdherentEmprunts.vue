<template>
  <div>
    <h1>Emprunts</h1>
    <EmpruntsList key="user" v-if="user" :loans="user.loans" isLight />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import EmpruntsList from "../Emprunt/components/EmpruntsList.vue";

export default {
  components: { EmpruntsList },
  name: "AdherentEmprunt",
  setup() {
    const store = useStore();
    const route = useRoute();
    const user = computed(() => store.getters.userById(route.params.id));

    return { user };
  },
};
</script>
