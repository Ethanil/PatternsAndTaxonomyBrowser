<template>
  <v-card>
    <v-navigation-drawer permanent>
      <template #prepend><v-card><v-card-text>Choose Action Verb to Filter Patterns</v-card-text></v-card></template>
      <v-list
        selectable
        mandatory
        open-strategy="single"
        v-model:selected="chosenActionverb"
      >
        <v-list-item :value="-1">All</v-list-item>
        <template
          v-for="(verbsArray, category) in store.categorizedActionVerbs"
        >
          <v-list-group :value="category">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="category"></v-list-item>
            </template>
            <template v-for="verbs of verbsArray">
              <v-list-item :value="verbs.value">
                <template v-for="verb in verbs.title">
                  <span>{{ verb }} </span>
                  <br />
                </template>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-container v-if="!chosenPattern" fluid>
      <v-autocomplete
        v-model="chosenPattern"
        :items="patterns"
        auto-select-first
        return-object
        density="compact"
        transition="fade-transition"
        bg-color="primary"
        label="search for Patterns"
      >
        <template #item="{ props }">
          <v-list-item v-bind="props" density="compact"></v-list-item>
        </template>
      </v-autocomplete>

      <v-row>
        <v-col v-for="pattern in patterns" xl="3" lg="4" md="6" sm="12">
          <PatternPreviewCard
            :patternTitle="pattern.title"
            height="100%"
            @click="
              () => {
                chosenPattern = pattern;
                scrollToTop();
              }
            "
          ></PatternPreviewCard>
        </v-col>
      </v-row>
    </v-container>
    <PatternBrowser
      v-else
      :initial-chosen-pattern="chosenPattern"
      @back="chosenPattern = null"
    ></PatternBrowser>
  </v-card>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import PatternPreviewCard from "./PatternPreviewCard.vue";
import PatternBrowser from "./PatternBrowser.vue";
import { usePatternsAndActionverbsStore } from "@/stores/patternsAndActionverbs";
import { Pattern } from "@/types/types";
const store = usePatternsAndActionverbsStore();
const chosenActionverb = defineModel("chosenActionverb", { default: [-1] });
watch(()=> chosenActionverb.value, (oldVal, newVal) => {if(oldVal[0] != newVal[0]) scrollToTop();})
const patterns = computed(() =>
  store.filteredPatterns(chosenActionverb.value[0])
);
const chosenPattern = defineModel<null|Pattern>("chosenPattern");
const scrollToTop = function () {
  window.scrollTo(0, 0);
};
</script>
