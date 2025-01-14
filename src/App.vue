<script setup>
import {RouterLink, RouterView} from 'vue-router';
import {ref} from 'vue';

const ch = ref('');
</script>

<template>
  <header>
    <MyInput v-model="ch" placeholder="placeholder" error-message="Описание ошибки"
      >Label</MyInput
    >
    <br />
    {{ ch }}
  </header>
</template>

<style scoped></style>
