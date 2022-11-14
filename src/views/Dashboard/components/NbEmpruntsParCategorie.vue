<template>
  <Chart
    title="Nombre d'emprunts par catégorie"
    :datas="nbEmpruntsParCategorie"
    label="Nombre d'emprunts"
    v-if="loaded"
    :options="options"
  />
</template>
<script>
import { api_getNbEmpruntsParCategorie } from "@/modules/api/statistics.js";
import { ref } from "@vue/reactivity";
import Chart from "@/components/Chart/Chart.vue";

export default {
  components: { Chart },
  setup() {
    const nbEmpruntsParCategorie = ref(null);
    const loaded = ref(false);

    api_getNbEmpruntsParCategorie().then(({ data }) => {
      const sortedData = data.sort((a, b) => {
        if (a.count === b.count)
          return ("" + a.category.name).localeCompare(b.category.name);
        else return b.count - a.count;
      });
      let obj = {};
      sortedData.forEach((d) => (obj = { ...obj, [d.category.name]: d.count }));
      nbEmpruntsParCategorie.value = obj;
      loaded.value = true;
    });

    const options = {
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { ticks: { stepSize: 1 } },
      },
    };

    return { loaded, nbEmpruntsParCategorie, options };
  },
};
</script>
