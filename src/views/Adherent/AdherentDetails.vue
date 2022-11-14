<template>
  <div>
    <h1>Profil</h1>
    <div class="user-details">
      <AdherentForm :key="user" :user="user" />
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AdherentForm from "./components/AdherentForm.vue";
import { computed } from "vue";

export default {
  name: "AdherentDetails",
  components: { AdherentForm },
  props: { adherent: { type: Object, required: false } },
  setup() {
    const store = useStore();
    const route = useRoute();
    const user = computed(() => store.getters.userById(route.params.id));

    return { user };
  },
};
</script>
