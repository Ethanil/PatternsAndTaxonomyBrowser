<template>
  <v-container v-if="chosenPattern">
    <v-row>
      <v-col>
        <v-btn
          color="primary"
          @click="
            () => {
              emit('back');
              scrollToTop();
            }
          "
          class="mb-3"
        >
          back to overview
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="primary"
          @click="goBackInHistory()"
          class="mb-3"
          :disabled="currentlyShownPatternIndex <= 0"
          icon="mdi-chevron-left"
        >
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="primary"
          @click="
            () => {
              goForwardInHistory();
            }
          "
          class="mb-3"
          :disabled="history.length <= currentlyShownPatternIndex + 1"
          icon="mdi-chevron-right"
        >
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <PatternCard
        :pattern="chosenPattern"
        elevation="6"
        @linkClicked="handleLinkClick"
      ></PatternCard>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import PatternCard from "./PatternCard.vue";
import { usePatternsAndActionverbsStore } from "@/stores/patternsAndActionverbs";
import { Pattern } from "@/types/types";
const store = usePatternsAndActionverbsStore()
const props = defineProps(["initialChosenPattern"]);

const chosenPattern = ref(props.initialChosenPattern);
watch(
  () => props.initialChosenPattern,
  (newValue, oldValue) => {
    console.log(newValue, oldValue, chosenPattern.value);
  }
);
const scrollToTop = function () {
  window.scrollTo(0, 0);
};
const handleLinkClick = function (targetName:string) {
  if (history.value.length > currentlyShownPatternIndex.value + 1) {
    history.value.splice(
      currentlyShownPatternIndex.value + 1,
      history.value.length - 1 - currentlyShownPatternIndex.value
    );
  }
  currentlyShownPatternIndex.value++;
  chosenPattern.value = (store.patterns as { title: string }[]).find(
    (pattern) => pattern["title"] && pattern.title === targetName
  );
  history.value.push(chosenPattern.value);
  scrollToTop();
};
const emit = defineEmits(["back"]);
const history = ref<Pattern[]>([props.initialChosenPattern]);
const currentlyShownPatternIndex = ref(0);
const goBackInHistory = function () {
  currentlyShownPatternIndex.value--;
  chosenPattern.value = history.value[currentlyShownPatternIndex.value];
};
const goForwardInHistory = function () {
  currentlyShownPatternIndex.value++;
  chosenPattern.value = history.value[currentlyShownPatternIndex.value];
};
</script>
