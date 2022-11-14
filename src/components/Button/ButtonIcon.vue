<template>
  <button :class="classButton" class="btn-icon" :disabled="disabled">
    {{ icon }}
  </button>
</template>

<script>
export default {
  name: "ButtonIcon",
  data() {
    return {
      classButton: {
        "material-icons-outlined": true,
        [`size-${this.size}`]: true,
      },
    };
  },
  props: {
    size: {
      validator(size) {
        return [18, 24, 36, 48].includes(size);
      },
    },
    icon: String,
    disabled: Boolean,
  },
};
</script>
