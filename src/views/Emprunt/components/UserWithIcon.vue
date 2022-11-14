<template>
  <div class="loan-td__user">
    {{ item.fullname }}
    <Icon
      icon="visibility"
      class="loan-item__view-icon"
      @click="showUser(item)"
    />
  </div>
</template>
<script>
import Icon from "@/components/Icon/Icon.vue";
import router, { routes } from "@/router/index";

export default {
  components: { Icon },
  name: "UserWithIcon",
  props: {
    item: { type: Object },
  },
  computed: {},
  methods: {
    showUser(user) {
      router.push({
        name: routes.adherentDetails,
        params: { id: user.id },
      });
    },
  },
};
</script>
