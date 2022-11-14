<template>
  <router-link :to="item.path" v-if="isParent || item.label !== 'Famille'">
    <div class="submenu-item">
      {{ item.label }}
    </div>
  </router-link>
</template>
<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "SubmenuItem",
  props: {
    item: { type: Object, required: true },
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const isParent = computed(() => {
      let user = store.getters.userById(route.params.id);
      let isParentTest = user && user.linkTo ? false : true;

      return isParentTest;
    });

    return {
      isParent,
    };
  },
};
</script>
