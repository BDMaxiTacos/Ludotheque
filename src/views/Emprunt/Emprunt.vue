<template>
  <div>
    <div class="page__header">
      <div class="container">
        <div class="col-md-9">
          <h1>Emprunts</h1>
        </div>
        <div class="col-md-3">
          <Input
            v-model="query"
            type="text"
            placeholder="Ex: jean, dupont, monopoly..."
            label="Rechercher"
          />
        </div>
      </div>
    </div>
    <EmpruntsList :loans="loans" />
  </div>
</template>

<script>
import EmpruntsList from "./components/EmpruntsList.vue";
import Input from "@/components/Input/Input.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  components: { EmpruntsList, Input },
  setup() {
    const store = useStore();

    const query = ref("");
    const loans = computed(() => store.getters.searchLoan(query.value));

    return {
      store,
      loans,
      query,
    };
  },
};
</script>
