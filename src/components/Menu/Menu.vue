<template>
  <div class="menu">
    <div>
      <MenuItem
        v-for="item in conf"
        :key="item"
        :item="item"
        :isOpen="isOpen"
      />
    </div>
    <Reduce @click="toggleMenu" :isOpen="isOpen" />
  </div>
</template>

<script>
import { ref } from "vue";
import { to, routes } from "@/router/index";
import MenuItem from "./components/MenuItem.vue";
import Reduce from "./components/Reduce.vue";

export default {
  name: "Menu",
  components: { MenuItem, Reduce },
  setup() {
    const conf = [
      { label: "Tableau de bord", icon: "dashboard", ...to(routes.dashboard) },
      { label: "Jeux", icon: "sports_esports", ...to(routes.jeu) },
      { label: "Emprunts", icon: "shopping_bag", ...to(routes.emprunt) },
      { label: "Adhérents", icon: "group", ...to(routes.adherent) },
      { label: "Paramètres", icon: "build", ...to(routes.parametres) },
    ];
    let isOpen = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    return { conf, isOpen, toggleMenu };
  },
};
</script>
