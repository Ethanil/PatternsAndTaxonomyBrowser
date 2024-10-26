<template>
  <v-card-text>
    <h2>{{ title }}</h2>
    <p v-for="row in rows">
      <template v-for="element in row">
        <template v-if="typeof element != 'string'">
          <template v-if="element.type === 'link'">
            <v-tooltip min-width="25%" max-width="600px" open-delay="250" content-class="my-tooltip">
              <template #activator="{ props }">
                <a
                  v-bind="props"
                  href="text.targetName"
                  @click.stop.prevent="emit('linkClicked', element.targetName)"
                >
                  {{ element.text }}
                </a>
              </template>
              <PatternPreviewCard
                :patternTitle="element.targetName as string"
                :is-tooltip="true"
              ></PatternPreviewCard>
            </v-tooltip>
          </template>

          <component :is="element.name">{{ element.text }}</component>
        </template>
        <span v-else>{{ element }} </span>
      </template>
    </p>
  </v-card-text>
</template>
<script setup lang="ts">
import { Row } from "@/types/types";
import PatternPreviewCard from "./PatternPreviewCard.vue";
defineProps<{ title: string; rows: Row[] }>();
const emit = defineEmits(["linkClicked"]);
</script>
<style>
.my-tooltip{
    background-color: transparent !important;
}
</style>
