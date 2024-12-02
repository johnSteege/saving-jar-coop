<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button, Card, InputText, Message, Toolbar } from "primevue";
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { addJar } from "@/data/firebaseHelpers";

const router = useRouter();

const initialValues = ref({
  jarname: "",
});

function onFormSubmit(event: FormSubmitEvent) {
  console.log(event.states.jarname.value);
  addJar({
    name: event.states.jarname.value,
  });
  router.push("/");
}
</script>

<template>
  <Toolbar class="p-1" style="margin-bottom: 1rem">
    <template #start>
      <Button @click="router.back()" title="Go Back"
        ><i class="pi pi-arrow-left"
      /></Button>
    </template>
  </Toolbar>
  <div class="flex justify-center">
    <Card class="w-6/12">
      <template #title>New Jar</template>
      <template #content>
        <Form v-slot="$form" :initialValues @submit="onFormSubmit">
          <InputText name="jarname" type="text" placeholder="Jar Name" fluid />
          <Message
            v-if="$form.states?.jarname?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >Name is required</Message
          >

          <Button type="submit" label="Create"></Button>
        </Form>
      </template>
    </Card>
  </div>
</template>
