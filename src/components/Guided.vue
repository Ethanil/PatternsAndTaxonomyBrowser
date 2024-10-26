<template>
  <v-card>
    <v-dialog max-width="600" v-model="helpModal">
      <template #activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          size="large"
          icon="mdi-help"
          color="primary"
          app
        >
        </v-fab>
      </template>
      <v-card class="pa-3">
        <v-list>
          <v-list-item>
            <template #prepend>
              <div class="mr-3">
                1.
              </div>
            </template>
            Formulate your learning question and break it down into more atomic learning questions. <br>
            An atomic learning question only deals with exactly one topic and can't be broken down into more, simpler questions.
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <div class="mr-3">
                2.
              </div>
            </template>
            Assign an action verb category from bloom's taxonomy to each question.
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <div class="mr-3">
                3.
              </div>
            </template>
            Choose the action verb in the list on the lefthand side to get 3 random matching patterns. <br>
            You can click on the patterns to learn more about each one.
          </v-list-item>
        </v-list>
        <v-card-text>
          You can browse all Patterns freely in the Browse Pattern section.
        </v-card-text>
        <v-card-subtitle>
          You can open this help again with the <v-btn icon="mdi-help" color="primary" size="x-small"></v-btn> in the bottom right corner
        </v-card-subtitle>
      </v-card>
    </v-dialog>
    <v-navigation-drawer v-model="props.drawer"  temporary>
      <template #prepend><v-card><v-card-text>Choose Action Verb to get 3 random patterns</v-card-text></v-card></template>
      <v-list open-strategy="single">
        <template v-for="(verbsArray, category) in store.categorizedActionVerbs">
          <v-list-group :value="category">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="category"></v-list-item>
            </template>
            <template v-for="verbs of verbsArray">
              <v-list-item class="py-2"  @click="showRandomPatterns(verbs.value)">
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
    <v-container fluid v-if="!chosenPattern">

      <v-row v-if="patterns && patterns.length>0">
        <v-col v-for="pattern in patterns" lg="4" md="6" cols="12">
          <PatternPreviewCard
            :patternTitle="pattern.title"
            height="100%"
            @click="
            chosenPattern = pattern;  scrollToTop();"
          ></PatternPreviewCard>
        </v-col>
      </v-row>
      <v-card v-else class="pa-3" >
        <v-list>
          <v-list-item>
            <template #prepend>
              <div class="mr-3">
                1.
              </div>
            </template>
            Formulate your learning question and break it down into more atomic learning questions. <br>
            An atomic learning question only deals with exactly one topic and can't be broken down into more, simpler questions.
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <div class="mr-3">
                2.
              </div>
            </template>
            Assign an action verb category from bloom's taxonomy to each question.
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <div class="mr-3">
                3.
              </div>
            </template>
            Choose the action verb in the list on the lefthand side to get 3 random matching patterns. <br>
            You can click on the patterns to learn more about each one.
          </v-list-item>
        </v-list>
        <v-card-text>
          You can browse all Patterns freely in the Browse Pattern section.
        </v-card-text>
        <v-card-text>
          You can browse all Patterns freely in the Browse Pattern section.
        </v-card-text>
        <v-card-subtitle>
          You can open this help again with the <v-btn icon="mdi-help" color="primary" size="x-small"></v-btn> in the bottom right corner
        </v-card-subtitle>
      </v-card>
    </v-container>
    <PatternBrowser v-else :initial-chosen-pattern="chosenPattern" @back="chosenPattern=null"></PatternBrowser>

  </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PatternPreviewCard from './PatternPreviewCard.vue';
import PatternBrowser from './PatternBrowser.vue';
import { usePatternsAndActionverbsStore } from "@/stores/patternsAndActionverbs";
import { Pattern } from '@/types/types';
const store = usePatternsAndActionverbsStore()
const props = defineProps(["drawer"]);

const helpModal = defineModel("helpModal", { default: false });
defineModel("chosenActionverb", { default: [-1] });
const showRandomPatterns = function (actionVerb: number) {
  const filteredPatterns = [...store.filteredPatterns(actionVerb)]
  patterns.value = [];
  for(let i = 0; i < 3; i++){
    patterns.value.push(filteredPatterns.splice(Math.floor(Math.random()*filteredPatterns.length),1)[0]);
  }
  patterns.value.sort();
};
const patterns = ref<Pattern[]>([])
const chosenPattern = defineModel("chosenPattern");
const scrollToTop = function () {
  window.scrollTo(0, 0);
};
</script>
