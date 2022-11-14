<template>
  <Chart
    title="Nombre d'emprunts par jeu"
    :datas="nbEmpruntsParJeux"
    label="Nombre d'emprunts"
    v-if="loaded"
    :options="options"
  />
</template>
<script>
import { api_getNbEmpruntsParJeu } from "@/modules/api/statistics.js";
import { ref } from "@vue/reactivity";
import Chart from "@/components/Chart/Chart.vue";

export default {
  components: { Chart },
  setup() {
    const nbEmpruntsParJeux = ref(null);
    const loaded = ref(false);

    api_getNbEmpruntsParJeu().then(({ data }) => {
      const sortedData = data.sort((a, b) => {
        if (a.count === b.count)
          return ("" + a.game.title).localeCompare(b.game.title);
        else return b.count - a.count;
      });
      let obj = {};
      sortedData.forEach((d) => (obj = { ...obj, [d.game.title]: d.count }));
      nbEmpruntsParJeux.value = obj;
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

    return { loaded, nbEmpruntsParJeux, options };
  },
};
</script>
