<template>
  <v-bottom-navigation v-model="count" color="primary" horizontal>
    <v-btn @click="navigateTo('/')">
      <v-icon>mdi-magnify</v-icon>
      <span>Tipper</span>
      <span>Lookup</span>
    </v-btn>

    <v-btn @click="navigateTo('/add-new-tipper')">
      <v-icon>mdi-account-edit</v-icon>
      <span>Add New Tipper</span>
    </v-btn>
    <v-btn @click="navigateTo('/tip-log')">
      <v-icon>mdi-book-open-variant</v-icon>
      <span>Tip Log</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
  const count = ref(0);

  function navigateTo(route: string) {
    useRouter().push(route);
  }
</script>
