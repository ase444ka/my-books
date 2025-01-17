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
  <header class="header">
    <div class="container">
      <div class="header__top">
        <svg class="header__logo">
          <use href="./assets/sprites.svg#logo"></use>
        </svg>
        <!-- <MyInput class="header__search" placeholder="Крига">
          <template #prepend-icon>
            <svg>
              <use href="./assets/sprites.svg#magnify"></use>
            </svg>
          </template>
        </MyInput> -->
        <!-- <MyButton class="header__search-button">
          <use href="./assets/sprites.svg#magnify"></use>
        </MyButton> -->
        <MyInput class="header__search header__search_mini" placeholder="Крига" is-success>
          <template #prepend-icon>
            <svg>
              <use href="./assets/sprites.svg#cross"></use>
            </svg>
          </template>
        </MyInput>
      </div>
      <div class="header__bottom">
        <h1 class="header__title">Книги в каталоге <span>3</span></h1>
        <MyButton class="header__button" text="Добавить книгу">
          <use href="./assets/sprites.svg#add"></use>
        </MyButton>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-border);
  padding-top: 13px;
  &__top {
    display: flex;
    align-items: center;
    gap: 25px;
    @media screen and (max-width: 480px) {
      gap: 16px;
    }
    @media screen and (max-width: 320px) {
      justify-content: space-between;
    }
  }

  &__bottom {
    display: flex;
  }

  &__logo {
    flex-basis: 55px;
    height: 41px;
    color: var(--color-text);
    flex-grow: 0;
    flex-shrink: 0;
  }

  &__search {
    flex-grow: 1;
    * {
      background-color: var(--color-background);
    }
  }

  &__bottom {
    padding-top: 13px;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
  &__title {
    padding-top: 11px;
    @media screen and (max-width: 480px) {
      padding-top: 0;
    }
    span {
      color: var(--color-paragraph);
      padding-left: 4px;
    }
  }
  &__button {
    @media screen and (max-width: 510px) {
      position: fixed;
      width: 90%;
      bottom: 20px;
      left: 5%;
    }
  }
  &__search-button {
    background-color: var(--color-background);
    &:hover {
      color: var(--color-text);
    }
  }
}
</style>
