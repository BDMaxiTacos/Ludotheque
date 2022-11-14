<template>
  <div class="chart">
    <h2>{{ title }}</h2>
    <Bar class="chart__diagram" :chartData="conf" :chartOptions="ooptions" />
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "Chart",
  components: { Bar },
  props: {
    title: { type: String, required: true },
    datas: { type: Object, required: true },
    label: { type: String },
    options: { type: Object },
  },
  setup(props) {
    const conf = {
      labels: Object.keys(props.datas ?? {}),
      datasets: [
        {
          label: props.label,
          backgroundColor: "#BE9DCF",
          data: Object.values(props.datas ?? {}),
        },
      ],
    };

    const ooptions = {
      maintainAspectRatio: false,
      responsive: true,
      ...(props.options ?? {}),
    };

    return {
      conf,
      ooptions,
    };
  },
};
</script>
