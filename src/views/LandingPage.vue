<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { Button, Toolbar } from "primevue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";

import JarsListView from "./JarsListView.vue";
import TransactionsListView from "./TransactionsListView.vue";
import { RouterLink } from "vue-router";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <Toolbar class="p-1">
    <template #start>
      <span class="text-2xl">Saving Jar</span>
    </template>
    <template #end>
      <Button @click="toggleDark()" title="Toggle dark mode"
        ><i class="pi pi-moon" v-if="isDark" />
        <i class="pi pi-sun" v-else />
      </Button>
      <RouterLink to="/new-jar" title="New Jar">
        <Button><i class="pi pi-box" /></Button>
      </RouterLink>
      <RouterLink to="/edit-transaction" title="New Transaction">
        <Button><i class="pi pi-plus" /></Button>
      </RouterLink>
    </template>
  </Toolbar>

  <Tabs value="jars">
    <TabList>
      <Tab value="jars"> Jars </Tab>
      <Tab value="transactions"> Transactions </Tab>
    </TabList>

    <TabPanels>
      <TabPanel value="jars">
        <JarsListView />
      </TabPanel>
      <TabPanel value="transactions">
        <TransactionsListView />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style scoped>
.p-tab {
  flex: 1; /* Tab buttons fill the available width */
  padding: 0.5rem;
}
</style>
