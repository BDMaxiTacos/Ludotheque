<template>
  <div class="submenu">
    <SubmenuItem v-for="item of conf" :key="item" :item="item" />
  </div>
</template>
<script>
import { to, routes, getConf } from "@/router/index.js";
import SubmenuItem from "./components/SubmenuItem.vue";
export default {
  components: { SubmenuItem },
  props: { menu: { type: String, required: true } },
  setup(props) {
    const conf = getConf(props.menu);

    return { to, routes, conf };
  },
};
</script>
