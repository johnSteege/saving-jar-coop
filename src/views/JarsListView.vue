<script setup lang="ts">
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { onMounted, ref } from "vue";
import { useDatabaseList } from "vuefire";

type Jar = {
  readonly id: string;
  name: string;
  notes?: string;
};

type Transaction = {
  readonly id: string;
  jar: string;
  amount: number;
  date: number;
  note?: string;
};

const db = getDatabase();
const jarsList = useDatabaseList<Jar>(dbRef(db, "jars"));

const transactionsRef = dbRef(db, "transactions");
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
