<template>
  <v-card min-height="100vh">
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-btn-toggle
          color="primary"
          base-color="primary"
          mandatory
          v-model="selectedNavigationItem"
        >
          <v-btn>Guided</v-btn>
          <v-btn>Browsing</v-btn>
          <v-btn style="flex-shrink: 1;"><span style="white-space: break-spaces;">Action Verbs</span></v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>
        <v-btn-toggle color="primary" base-color="primary">
          <v-btn :icon="theme.global.current.value.dark? 'mdi-white-balance-sunny' : 'mdi-weather-night'" @click="toggleTheme"></v-btn>
        </v-btn-toggle>
      </v-app-bar>

      <v-main>
        <v-card-text>
          <v-tabs-window v-model="selectedNavigationItem"
            ><component
              :is="items[selectedNavigationItem].value"
              :drawer="drawer"
              @close-drawer="drawer=false"
            ></component
          ></v-tabs-window>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Browse from "./components/Browse.vue";
import Guided from "./components/Guided.vue";

import { useTheme } from "vuetify";
import Verbs from "./components/Verbs.vue";

const theme = useTheme();
onMounted(() => {
  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme) {
    theme.global.name.value = selectedTheme;
  } else {
    localStorage.setItem("selectedTheme", "light");
  }
});
function toggleTheme() {
  const selectedTheme = theme.global.current.value.dark ? "light" : "dark";
  localStorage.setItem("selectedTheme", selectedTheme);
  theme.global.name.value = selectedTheme;
}

const drawer = defineModel<boolean>("drawer", {
  type: Boolean,
  default: false,
});
const selectedNavigationItem = defineModel("selectedNavigationItem", {
  type: Number,
  default: 0,
});
const items = [
  {
    title: "Guided Ideation",
    value: Guided,
  },
  {
    title: "Browse Patterns",
    value: Browse,
  },
  {
    title: "Action Verbs",
    value: Verbs,
  },
];
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>
