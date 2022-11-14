<template>
  <div>
    <h1>Editeurs</h1>
    <Datatable
      v-if="mappedEditeurs?.length !== 0"
      :headers="headers"
      :body="mappedEditeurs"
    />
    <NoItem v-else>Aucun éditeur trouvé</NoItem>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Datatable from "@/components/Datatable/Datatable.vue";
import NoItem from "../../components/NoItem/NoItem.vue";
import ButtonIcon from "../../components/Button/ButtonIcon.vue";
import { computed } from "vue";
export default {
  components: { Datatable, NoItem },
  setup() {
    const store = useStore();

    const headers = [
      { label: "Nom de l'éditeur", value: "name" },
      { label: "Nombre de jeux", value: "count" },
      { label: "Actions", value: "actions" },
    ];

    const deleteEditor = (editor) => {
      const hasConfirm = confirm(
        `Êtes vous sur de vouloir supprimer l'éditeur \n "${editor.name}"`
      );
      if (hasConfirm) store.dispatch("deleteEditor", editor.id);
    };

    const mappedEditeurs = computed(() =>
      store.getters.editors.map((editor) => ({
        name: editor.name,
        count: store.getters.nbGamesPerEditors(editor.id),
        id: editor.id,
        actions: {
          component: ButtonIcon,
          actions: [{ icon: "delete", onClick: deleteEditor }],
        },
      }))
    );

    return { headers, mappedEditeurs };
  },
};
</script>
