import { createRouter, createWebHistory } from "vue-router";
import Jeu from "../views/Jeu/Jeu.vue";
import Login from "../views/Login/Login.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import Submenu from "@/components/Submenu/Submenu.vue";
import { isLoggedIn } from "../utils/auth";

export const routes = {
  dashboard: "dashboard",
  jeu: "jeu",
  adherent: "adherent",
  adherentDetails: "adherentDetails",
  adherentEmprunts: "adherentEmprunts",
  adherentFamille: "adherentFamille",
  emprunt: "emprunt",
  parametres: "parametres",
  parametresAdhesion: "parametresAdhesion",
  parametresAdmin: "parametresAdmin",
  parametresCategories: "parametresCategories",
  login: "login",
};

const routesDef = {
  [routes.dashboard]: {
    path: "/",
    name: routes.dashboard,
    component: Dashboard,
  },
  [routes.jeu]: {
    path: "/jeu",
    name: routes.jeu,
    component: Jeu,
    meta: {
      allowAnonymous: true,
    },
  },
  [routes.emprunt]: {
    path: "/emprunt",
    name: routes.emprunt,
    component: () => import("@/views/Emprunt/Emprunt.vue"),
  },
  [routes.adherent]: {
    path: "/adherent",
    name: routes.adherent,
    exact: true,
    component: () => import("@/views/Adherent/Adherent.vue"),
  },
  [routes.adherentDetails]: {
    path: "/adherent/:id",
    name: routes.adherentDetails,
    components: {
      default: () => import("@/views/Adherent/AdherentDetails.vue"),
      submenu: <Submenu menu="adherentDetails" key="adherentDetails" />,
    },
  },
  [routes.adherentEmprunts]: {
    path: "/adherent/:id/emprunts",
    name: routes.adherentEmprunts,
    components: {
      default: () => import("@/views/Adherent/AdherentEmprunts.vue"),
      submenu: <Submenu menu="adherentDetails" key="adherentDetails" />,
    },
  },
  [routes.adherentFamille]: {
    path: "/adherent/:id/famille",
    name: routes.adherentFamille,
    components: {
      default: () => import("@/views/Adherent/AdherentFamille.vue"),
      submenu: <Submenu menu="adherentDetails" key="adherentDetails" />,
    },
  },
  [routes.parametres]: {
    path: "/parametre",
    name: routes.parametres,
    components: {
      default: () => import("@/views/Parametre/Editeur/Editeurs.vue"),
      submenu: <Submenu menu="parametres" key="parametres" />,
    },
  },
  [routes.parametresAdhesion]: {
    path: "/parametre/types-adhesion",
    name: routes.parametresAdhesion,
    components: {
      default: () => import("@/views/Parametre/Adhesion/Adhesions.vue"),
      submenu: <Submenu menu="parametres" key="parametres" />,
    },
  },
  [routes.parametresAdmin]: {
    path: "/parametres/administrateurs",
    name: routes.parametresAdmin,
    components: {
      default: () =>
        import("@/views/Parametre/Administrateurs/Administrateurs.vue"),
      submenu: <Submenu menu="parametres" key="parametres" />,
    },
  },
  [routes.parametresCategories]: {
    path: "/parametres/categories",
    name: routes.parametresCategories,
    components: {
      default: () => import("@/views/Parametre/Categorie/Categorie.vue"),
      submenu: <Submenu menu="parametres" key="parametres" />,
    },
  },
  [routes.login]: {
    path: "/login",
    name: routes.login,
    component: Login,
    meta: {
      allowAnonymous: true,
    },
  },
};

export const to = (route) => {
  return routesDef[route];
};

const toArray = (routesObject) => {
  const keyss = Object.keys(routesObject);
  return keyss.map(to);
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: toArray(routes),
});

router.beforeEach((to, _, next) => {
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    window.open("/login", "_self");
  } else {
    next();
  }
});

export const getConf = (menu) => {
  switch (menu) {
    case "adherentDetails":
      return [
        { label: "Profil", path: to(routes.adherentDetails) },
        { label: "Emprunts", path: to(routes.adherentEmprunts) },
        { label: "Famille", path: to(routes.adherentFamille) },
      ];
    case "parametres":
      return [
        { label: "Editeurs", path: to(routes.parametres) },
        { label: "Type d'adhésion", path: to(routes.parametresAdhesion) },
        { label: "Administrateurs", path: to(routes.parametresAdmin) },
        { label: "Catégories", path: to(routes.parametresCategories) },
      ];
    default:
      return [];
  }
};
export default router;
