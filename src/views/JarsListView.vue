<script setup lang="ts">
import { jarsList, jarSums } from "@/data/firebaseHelpers";
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
