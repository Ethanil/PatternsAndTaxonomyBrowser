import { defineStore } from "pinia";
import { computed, ref } from "vue";
import rawPatterns from "../assets/patterns.json";
import { Pattern } from "@/types/types";

export const usePatternsAndActionverbsStore = defineStore(
  "patternsAndActionverbs",
  () => {
    const csvData = ref<null|string>(null);
    fetch("/patternsXTaxonomy.csv")
      .then((res) => res.text())
      .then((res) => (csvData.value = res));
    const patternsXTaxonomy = computed(() => {
      if (!csvData.value) return null;
      return parseCSV(csvData.value);
    });
    const actionVerbs = computed(() => {
      if (!patternsXTaxonomy.value) {
        return [];
      }
      return Object.entries(patternsXTaxonomy.value[1].slice(3, -4));
    });
    let curCategory = "";
    const categorizedActionVerbs = computed(() => {
      if (!patternsXTaxonomy.value || actionVerbs.value.length == 0) return null;
      filteredPatterns(-1)
      let result = {} as {[key: string]: {title: string[], value: number}[]};
      for (let [index, category] of Object.entries(
        patternsXTaxonomy.value[0].slice(3, -4)
      )) {
        if (category !== "") {
          curCategory = category;
          result[category] = [];
        }
        result[curCategory].push({
          title: patternsXTaxonomy.value[1][Number(index) + 3].split("\n"),
          value: Number(index),
        });
      }
      return result;
    });
    const filteredPatternsCache = new Map();
    const patterns = computed(() => {
      if (!patternsXTaxonomy.value || actionVerbs.value.length == 0) return [];
      for (var pattern of rawPatterns as Pattern[]) {
        for (var row of patternsXTaxonomy.value) {
          if (row[0] === pattern.title) {
            var res = {} as {[key: string]: boolean};
            const isUsable =
              row[row.length - 2] === "FALSE" &&
              row[row.length - 4] === "FALSE";
            for (const [index, actionVerb] of actionVerbs.value) {
              const i = Number(index) + 3;
              if (actionVerb === "") continue;
              res[actionVerb] = isUsable && row[i] === "TRUE";
            }
            pattern["actionVerbs"] = res;
            pattern["rawCSVRow"] = row;
          }
        }
      }
      return rawPatterns as Pattern[];
    });
    function filteredPatterns(verbIndex:number): Pattern[] {
      if (filteredPatternsCache.has(verbIndex)){
        return filteredPatternsCache.get(verbIndex);}
      const filteredPatterns = patterns.value.filter((pattern) => {
        if (verbIndex === -1) return true;
        return Object.entries(pattern.actionVerbs!)[verbIndex][1];
      });
      filteredPatternsCache.set(verbIndex, filteredPatterns);
      return filteredPatterns
    }
    return {
      patterns,
      patternsXTaxonomy,
      categorizedActionVerbs,
      filteredPatterns,
    };
  }
);

function parseCSV(str:string) {
  const arr = [] as string[][];
  let quote = false; // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (let row = 0, col = 0, c = 0; c < str.length; c++) {
    let cc = str[c],
      nc = str[c + 1]; // Current character, next character
    arr[row] = arr[row] || []; // Create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // Create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," && !quote) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }
  return arr;
}
