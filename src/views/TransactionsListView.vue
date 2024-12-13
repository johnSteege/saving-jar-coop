<script setup lang="ts">
import { transactionsRef, type Transaction } from "@/data/firebaseHelpers";
import { useDatabaseList } from "vuefire";

const transactionsList = useDatabaseList<Transaction>(transactionsRef);
</script>

<template>
  <div>
    <div v-for="transaction in transactionsList" :key="transaction.id">
      <RouterLink :to="'/edit-transaction/' + transaction.id">
        <span>{{ transaction.description }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
