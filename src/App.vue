<script setup>
import {RouterLink, RouterView} from 'vue-router';
import {ref, onMounted} from 'vue';
import {inject} from 'vue';
const successNoty = inject('successNoty');
const errorNoty = inject('errorNoty');

onMounted(() => {
  successNoty('Приветик!');
  setTimeout(() => {
    errorNoty('вот беда :()');
  }, 7000);
});
const ch = ref('');
</script>

<template>
  <header>
    <MyButton text="Button">
      <use href="./assets/sprites.svg#success"></use>
    </MyButton>
    <br />
    <MyButton>
      <use href="./assets/sprites.svg#trash"></use>
    </MyButton>
  </header>
</template>

<style scoped></style>
