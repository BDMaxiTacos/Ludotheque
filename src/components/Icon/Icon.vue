<template>
  <span :class="className">
    {{ icon }}
  </span>
</template>

<script>
export default {
  name: "Icon",
  data() {
    return {
      className: {
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
  },
};
</script>
