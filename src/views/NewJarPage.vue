<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button, Card, InputText, Message, Toolbar } from "primevue";
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { addJar } from "@/data/firebaseHelpers";

const router = useRouter();

type jarFormValues = {
  jarname: string;
};

const initialValues = ref<jarFormValues>({
  jarname: "",
});

const resolver = ({ values }: any) => {
  const errors: Record<string, any[]> = { jarname: [] };

  if (!values.jarname) {
    errors.jarname = [{ message: "Jar name is required." }];
  } else if (values.jarname.length < 3) {
    errors.jarname = [{ message: "Jar name must be at least 3 characters." }];
  }

  return {
    errors,
  };
};

function onFormSubmit(event: FormSubmitEvent) {
  if (!event.valid) {
    return;
  }

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
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
          <div class="flex flex-col justify-center items-center gap-4">
            <InputText
              name="jarname"
              type="text"
              placeholder="Jar Name"
              fluid
            />

            <!-- @vue-ignore -->
            <Message
              v-if="$form.jarname?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              <!-- @vue-ignore -->
              {{ $form.jarname.error.message }}</Message
            >

            <Button type="submit" label="Create"></Button>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>
