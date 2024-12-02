<script setup lang="ts">
import {
  transactionsRef,
  type Transaction,
  jarsRef,
  type Jar,
} from "@/data/firebaseHelpers";
import { onValue } from "firebase/database";
import { ref } from "vue";
import { useDatabaseList } from "vuefire";

const jarsList = useDatabaseList<Jar>(jarsRef);
const transactionsList = useDatabaseList<Transaction>(transactionsRef);
const jarSums = ref<Record<string, number>>({});

onValue(transactionsRef, () => {
  sumTransactions();
});

function sumTransactions() {
  transactionsList.value.forEach((transaction) => {
    jarSums.value[transaction.jar] =
      (jarSums.value[transaction.jar] || 0) + Number(transaction.amount);
  });
}
</script>

<template>
  <ul>
    <li v-for="jar in jarsList" :key="jar.id">
      <div>{{ jar.id }}</div>
      <div>{{ jar }}</div>
      <div>{{ jarSums[jar.id] || 0 }}</div>
    </li>
  </ul>
</template>
