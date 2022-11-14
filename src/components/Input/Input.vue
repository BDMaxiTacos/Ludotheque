<template>
  <div class="input" :class="{ error }">
    <textarea
      v-if="type === 'textarea'"
      class="input__field"
      :placeholder="placeholder"
      :name="name"
      v-model="value"
      :required="required"
    />
    <select
      v-else-if="type === 'select'"
      class="input__field"
      :placeholder="required ? '' : placeholder"
      :name="name"
      v-model="value"
      :required="required"
    >
      <option v-if="placeholder && required" disabled :value="undefined">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <Multiselect
      class="input__field"
      v-else-if="type === 'multiselect'"
      v-model="value"
      :options="options"
      label="label"
      track-by="value"
      noResultsText="Aucun résultat trouvé"
      :mode="mode"
      :searchable="searchable"
      :taggable="taggable"
      @search-change="search"
    />
    <input
      v-else
      class="input__field"
      :type="type || 'text'"
      :placeholder="placeholder"
      :name="name"
      v-model="value"
      :required="required"
      :maxlength="maxLength"
    />
    <label class="input__label" :for="name">{{ label }}</label>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
export default {
  components: { Multiselect },
  props: {
    type: String,
    label: String,
    name: { type: String },
    placeholder: String,
    modelValue: {},
    error: Boolean,
    required: Boolean,
    options: {},
    maxLength: { Number },
    mode: {},
    searchable: Boolean,
    taggable: Boolean,
  },
  methods: {
    search(value) {
      this.$emit("search-change", value);
    },
    validateProps() {
      if (
        (this.type === "select" && !this.options) ||
        (this.type === "multiselect" && !this.options)
      ) {
        console.error("Options props is required with select type");
      }
    },
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        this.validateProps();
      },
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
