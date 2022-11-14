<template>
  <router-link :to="item.path" :exact="true">
    <div class="menu-item" :class="{ '-isOpen': isOpen }">
      <div class="menu-item__container">
        <Icon class="menu-item__icon" :icon="item.icon" :size="24" />
        <div class="menu-item__label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Icon from "@/components/Icon/Icon.vue";
export default {
  name: "MenuItem",
  components: { Icon },
  props: ["item", "isOpen"],
};
</script>
