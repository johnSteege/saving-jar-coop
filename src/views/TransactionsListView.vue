<script setup lang="ts">
import { transactionsRef, type Transaction } from "@/data/firebaseHelpers";
import { useDatabaseList } from "vuefire";

const transactionsList = useDatabaseList<Transaction>(transactionsRef);
</script>

<template>
  <ul>
    <li v-for="transaction in transactionsList" :key="transaction.id">
      <div>{{ transaction.id }}</div>
      <div>{{ transaction }}</div>
    </li>
  </ul>
</template>
