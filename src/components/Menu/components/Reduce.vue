<template>
  <div class="menu-item" :class="{ '-isOpen': isOpen }">
    <div class="menu-item__container">
      <Icon
        icon="chevron_left"
        class="menu-item__icon"
        :class="{ '-isOpen': isOpen }"
        :size="24"
      />
      <div class="menu-item__label">Réduire</div>
    </div>
  </div>
</template>

<script>
import Icon from "../../Icon/Icon.vue";
export default {
  components: { Icon },
  props: ["isOpen"],
};
</script>
