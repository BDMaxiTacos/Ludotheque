<template>
  <div @click="hide" class="modal">
    <div @click.stop class="modal__content">
      <div class="modal__header">
        <h2>{{ title }}</h2>
        <button class="modal__close-button" @click="hide">
          <Icon icon="close" :size="24" />
        </button>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon/Icon.vue";

export default {
  props: ["title"],
  components: { Icon },
  name: "Modal",
  methods: {
    hide() {
      this.$emit("closeModal");
    },
  },
};
</script>
