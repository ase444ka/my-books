<script setup>
import {NSelect} from 'naive-ui';
import ArrowSort28Regular from '@vicons/fluent/ArrowSort28Regular';

import {useSearchStore} from '@/stores/search.js';
import {useBooksStore} from '@/stores/books.js';
import {storeToRefs} from 'pinia';

const searchStore = useSearchStore();
const {searchString, sortBy} = storeToRefs(searchStore);
const {clearSearchString} = searchStore;

const booksStore = useBooksStore();
const {isEditing, booksCount} = storeToRefs(booksStore);
const {updateBookList} = booksStore;

const sortParams = [
  {
    label: 'По умолчанию',
    value: 'default',
  },
  {
    label: 'По году выхода',
    value: 'year',
  },
  {
    label: 'По автору',
    value: 'author',
  },
  {
    label: 'По названию',
    value: 'title',
  },
];


const openToAdd = () => {
  isEditing.value = true;
};


</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <svg class="header__logo">
          <use href="@/assets/sprites.svg#logo"></use>
        </svg>
        <MyInput
          class="header__search"
          placeholder="Найти ту самую книгу"
          v-model="searchString"
        >
          <template #prepend-icon>
            <svg>
              <use href="@/assets/sprites.svg#magnify"></use>
            </svg>
          </template>
          <template #append-icon>
            <svg v-if="searchString" @click="clearSearchString">
              <use href="@/assets/sprites.svg#cross"></use>
            </svg>
          </template>
        </MyInput>
      </div>
      <div class="header__bottom header__bottom_desktop">
        <h1 class="header__title">
          <template v-if="searchString"
            >Книги по запросу {{ searchString }}</template
          >
          <template v-else
            >Книги в каталоге <span>{{ booksCount }}</span></template
          >
        </h1>
        <NSelect
          :options="sortParams"
          default-value="default"
          v-model:value="sortBy"
          class="header__select"
          size="large"
        >
          <template #arrow>
            <ArrowSort28Regular />
          </template>
        </NSelect>
        <MyButton
          class="header__button"
          text="Добавить книгу"
          @click="openToAdd"
        >
          <use href="@/assets/sprites.svg#add"></use>
        </MyButton>
      </div>
      <div class="header__bottom header__bottom_mobile">
        <h1 class="header__title">
          <template v-if="searchString"
            >Книги по запросу {{ searchString }}</template
          >
          <template v-else
            >Книги в каталоге <span>{{ booksCount }}</span></template
          >
        </h1>
        <div class="header__controls">
          <NSelect
            :options="sortParams"
            default-value="default"
            v-model:value="sortBy"
            class="header__select"
            size="large"
          >
            <template #arrow>
              <ArrowSort28Regular />
            </template>
          </NSelect>
          <MyButton
            class="header__button"
            text="Добавить книгу"
            @click="openToAdd"
          >
            <use href="@/assets/sprites.svg#add"></use>
          </MyButton>
        </div>
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
    svg {
      margin-right: 10px;
      &:last-child {
        cursor: pointer;
      }
    }
  }

  &__bottom {
    padding-top: 13px;
    padding-bottom: 16px;
    justify-content: space-between;
    @media screen and (max-width: 480px) {
      padding-top: 11px;
      padding-bottom: 13px;
    }
    &_desktop {
      display: none;
      @media screen and (min-width: 1025px) {
        display: flex;
      }
    }
    &_mobile {
      display: none;
      @media screen and (max-width: 1024px) {
        display: block;
      }
    }
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

  &__controls {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 30px;
    @media screen and (max-width: 768px) {
      justify-content: space-between;
    }
  }

  &__select {
    flex-grow: 0;
    max-width: 200px;
    @media screen and (max-width: 510px) {
      flex-grow: 1;
      max-width: inherit;
    }

    :deep(.n-base-selection-label) {
      height: 49px;
      border-radius: 8px;
      padding-left: 16px;
      padding-right: 16px;
      @media screen and (max-width: 1024px) {
        height: 40px;
      }
    }
    * {
      box-shadow: none !important;
      border: none !important;
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
