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
import { api_getDureeMoyenne } from "@/modules/api/statistics.js";
import { ref } from "@vue/reactivity";
import Chart from "@/components/Chart/Chart.vue";

export default {
  components: { Chart },
  setup() {
    const nbEmpruntsParJeux = ref(null);
    const loaded = ref(false);

    api_getDureeMoyenne().then(({ data }) => {
      const sortedData = data.sort((a, b) => {
        if (a.duration === b.duration)
          return ("" + a.game.title).localeCompare(b.game.title);
        else return b.duration - a.duration;
      });

      let obj = {};
      const NB_MS_DAY = 60 * 60 * 24 * 1000;
      sortedData.forEach(
        (d) =>
          (obj = {
            ...obj,
            [d.game.title]: Math.ceil(d.duration / NB_MS_DAY),
          })
      );
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
