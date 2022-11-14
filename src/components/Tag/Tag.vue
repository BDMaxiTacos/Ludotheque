<template>
  <span
    class="tag"
    :class="{ '--orange': orange, '--green': green, '--red': red }"
    ><slot
  /></span>
</template>

<script>
export default {
  props: { green: Boolean, orange: Boolean, red: Boolean },
};
</script>
