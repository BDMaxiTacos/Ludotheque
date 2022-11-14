<template>
  <div class="app" v-if="!location.pathname.startsWith('/login')">
    <Menu />
    <div class="app__main">
      <div class="app__header">
        <Header />
      </div>
      <div class="app__container container">
        <router-view name="submenu" class="submenu-router" />
        <router-view class="main-router" />
      </div>
    </div>
  </div>

  <div v-else class="app">
    <div class="app__container container">
      <router-view class="main-router" />
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import Header from "./components/Header/Header.vue";
import Menu from "./components/Menu/Menu";

export default {
  name: "App",
  components: { Menu, Header },
  setup() {
    const store = useStore();

    const location = reactive(window.location);

    store.dispatch("getUsers");
    store.dispatch("getGames");
    store.dispatch("getLoans");
    store.dispatch("getEditors");
    store.dispatch("getAdhesions");

    store.dispatch("getCategories");
    return { location };
  },
  methods: {
    displayModal(modal) {
      this.$refs[modal].display();
    },
  },
};
</script>

<style src="./assets/css/style.css" />
