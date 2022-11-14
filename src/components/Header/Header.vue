<template :key="location">
  <div class="header">
    <span v-if="isLoggedIn() && connectedUser" class="header__name">
      <span>
        {{ `${connectedUser.firstname} ${connectedUser.lastname}` }}
      </span>
      <ButtonIcon
        style="padding: 5px; border-radius: 50%"
        icon="logout"
        @click="logout"
      />
    </span>

    <button class="btn" v-else @click="redirectToLogin">Me connecter</button>
  </div>
</template>
<script>
import { isLoggedIn, logoutUser } from "@/utils/auth";
// import { routes, to } from "@/router/index";
// import { useRouter } from "vue-router";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  components: { ButtonIcon },
  setup() {
    // const router = useRouter();
    const store = useStore();

    const connectedUser = computed(() => store.getters.connectedUser);

    const redirectToLogin = () => {
      // router.push(to(routes.login));
      window.open("/login", "_self");
    };

    const logout = () => {
      const hasConfirm = confirm("Êtes vous sur de vouloir vous déconnecter ?");
      if (hasConfirm) logoutUser();
    };
    return {
      isLoggedIn,
      location: window.location,
      logout,
      redirectToLogin,
      connectedUser,
    };
  },
};
</script>
