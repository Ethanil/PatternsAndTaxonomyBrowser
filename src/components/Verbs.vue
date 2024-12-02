<template>
  <v-card>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(verbsArray, category) in store.categorizedActionVerbs"
      >
        <v-expansion-panel-title>
          {{ category }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-expansion-panels v-for="verbs of verbsArray" variant="accordion">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <template v-for="verb in verbs.title">
                  {{ verb }}
                  <br />
                </template>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                {{ verbs.description }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script setup lang="ts">
import { usePatternsAndActionverbsStore } from "@/stores/patternsAndActionverbs";
const store = usePatternsAndActionverbsStore();
</script>
