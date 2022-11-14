<template>
  <table class="datatable">
    <thead class="datatable__header">
      <tr>
        <th
          class="datatable__item"
          v-for="header in headers"
          :key="header.value"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="{ 'datatable__clickable-row': isRowHoverHighlighting }"
        v-for="(item, index) in body"
        :key="index"
        @click="rowClick(item)"
      >
        <td
          class="datatable__item"
          v-for="(key, index) in headingValues"
          :key="index"
        >
          <component
            v-if="item[key].component && key !== 'actions'"
            :is="item[key].component"
            :item="item[key].children"
            v-bind="{ ...item[key].props }"
          >
            {{ item[key].children }}
          </component>
          <div v-else-if="key === 'actions'">
            <component
              v-for="(actionItem, actionIndex) in item[key].actions"
              :key="actionIndex"
              :is="item[key].component"
              :icon="actionItem.icon"
              @click.stop="actionItem.onClick(item, actionItem.nonActive)"
              :disabled="actionItem.nonActive"
            >
            </component>
          </div>
          <template v-else>
            {{ item[key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Datatable",
  props: {
    headers: { type: Array },
    body: { type: Array },
    isRowHoverHighlighting: { type: Boolean }, // For CSS ONLY
    props: Object,
  },
  setup: function () {},
  computed: {
    headingValues: function () {
      return this.headers.map((header) => header.value);
    },
  },
  methods: {
    rowClick: function (item) {
      this.$emit("rowClick", item);
    },
  },
};
</script>
