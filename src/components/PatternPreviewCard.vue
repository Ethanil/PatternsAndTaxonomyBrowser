<template>
  <v-lazy transition="fade-transition">
    <!-- The @click is here to have the card have a click animation, even tho it is wrapped by v-lazy -->
    <v-card class="pa-2" elevation="12" density="compact" :min-height="isTooltip? '0px' : '350px'" @click="">
      <v-card-title>
        {{ patternTitle }}
      </v-card-title>
      <v-card-subtitle
        v-if="pattern"
        style="text-overflow: unset; white-space: wrap; opacity: 1"
        >{{ pattern.shortDescription }}</v-card-subtitle
      >
      <v-divider style="opacity: 1" class="my-2"></v-divider>
      <v-card-subtitle
        v-if="pattern"
        style="text-overflow: unset; white-space: wrap; opacity: 1"
        >{{ pattern.longDescription }}</v-card-subtitle
      >
    </v-card>
  </v-lazy>
</template>
<script lang="ts" setup>
import { usePatternsAndActionverbsStore } from "@/stores/patternsAndActionverbs";
import { computed } from "vue";
const store = usePatternsAndActionverbsStore();

const props = defineProps<{ patternTitle: string, isTooltip?: boolean }>();
const pattern = computed(() => {
  return store.patterns.find((pattern) => pattern.title == props.patternTitle);
});
</script>
