<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-card-title>
            <h1>
              {{ pattern.title }}
            </h1>
          </v-card-title>
          <v-card-subtitle>{{ pattern.shortDescription }}</v-card-subtitle>
          <v-card-text>{{ pattern.longDescription }}</v-card-text>
          <PatternChapter
            title="Examples"
            :rows="pattern.Examples"
            @linkClicked="(target) => emit('linkClicked', target)"
          ></PatternChapter>
          <PatternChapter
            title="Using the pattern"
            :rows="pattern.UsingThePattern"
            @linkClicked="(target) => emit('linkClicked', target)"
          ></PatternChapter>
          <PatternChapter
            title="Consequences"
            :rows="pattern.Consequences"
            @linkClicked="(target) => emit('linkClicked', target)"
          ></PatternChapter>
          <PatternChapter
            title="Relations"
            :rows="pattern.Relations"
            @linkClicked="(target) => emit('linkClicked', target)"
          ></PatternChapter>
        </v-col>
        <v-col cols="auto">
          <span style="display: block; width: 210px;">{{ pattern.rawCSVRow![2] }}</span>
          <v-table density="compact" class="action-verb-table">
            <tbody>
              <tr v-for="([verbs, value]) in computedActionVerbs">
                <td>
                  <template v-for="verb in verbs">{{ verb }}<br></template></td>
                <td :style="(value ? 'background:green;' : '') + ' width: 75px;'" >
                  <v-icon
                    v-if="value"
                    icon="mdi-check-bold"
                    class="action-verb-icon"
                  ></v-icon>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import PatternChapter from "./PatternChapter.vue";
import { Pattern } from "@/types/types";


const props = defineProps<{ pattern: Pattern }>();
const emit = defineEmits(["linkClicked"]);
const computedActionVerbs = computed(() => {
  return Object.entries(props.pattern.actionVerbs!).map(([verbs, value]) => {
    return [verbs.split("\r\n"), value];
  });
});
</script>
<style>
.action-verb-table table {
  border: 1px solid;
  width: auto !important;
}
.action-verb-table th {
  padding: 0 3px !important;
}
.action-verb-table th + th {
  border-left: 1px solid;
}
.action-verb-table td + td {
  border-left: 1px solid;
}
.action-verb {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding-top: 0.5rem;
}
.action-verb-icon {
  left: calc(50% - 10.5px);
}
</style>
