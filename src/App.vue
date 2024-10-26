<template>
  <v-card min-height="100vh">
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <!-- <v-toolbar-title>{{ items[selectedNavigationItem].title }}</v-toolbar-title> -->
         <v-btn-toggle
         color="primary"
         base-color="primary"
         mandatory
         v-model = selectedNavigationItem>
        <v-btn>Guided</v-btn>
        <v-btn>Browsing</v-btn>
         </v-btn-toggle>
        <v-spacer></v-spacer>
      </v-app-bar>

      <!-- <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-tabs
        direction="vertical"
        v-model="selectedNavigationItem"><template v-for="(item, key) in items" :key="key"> <v-tab :value="key">{{item.title}}</v-tab></template></v-tabs>
      </v-navigation-drawer> -->

      <v-main>
        <v-card-text>
          <v-tabs-window v-model="selectedNavigationItem"><component :is="items[selectedNavigationItem].value" :drawer="drawer"></component></v-tabs-window>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import Browse from "./components/Browse.vue"
import Guided from "./components/Guided.vue"

const drawer = defineModel<boolean>("drawer", {
  type: Boolean,
  default: false,
});
const selectedNavigationItem = defineModel("selectedNavigationItem", {type: Number, default:0})
const items= [
        {
          title: 'Guided Ideation',
          value: Guided,
        },
        {
          title: 'Browse Patterns',
          value: Browse,
        },
      ];
</script>
<style>
::-webkit-scrollbar {
    display: none;
}
</style>
