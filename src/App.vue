<script setup>
import {ref, inject, computed} from 'vue';
const successNoty = inject('successNoty');
const errorNoty = inject('errorNoty');
import BookDialog from '@/components/BookDialog.vue';
import bookKeeper from '@/api/book-keeper.js';
import {NSelect} from 'naive-ui';

import ArrowSort28Regular from '@vicons/fluent/ArrowSort28Regular';

const sortFunctions = {
  default: (a, b) => a.id - b.id,
  year: (a, b) => a.year - b.year,
  author: (a, b) => a.author.localeCompare(b.author),
  title: (a, b) => a.title.localeCompare(b.title),
};

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

const sortBy = ref('default');

const bookList = ref(bookKeeper.getList());
const currentBook = ref(null);

const showModal = ref(false);

const searchString = ref('');

const openToAdd = () => {
  showModal.value = true;
};

const openToEdit = (book) => {
  currentBook.value = book;
  showModal.value = true;
};

const refresh = () => {
  showModal.value = false;
  currentBook.value = null;
};

const refreshAndUpdate = () => {
  refresh();
  bookList.value = bookKeeper.getList();
};

const saveBook = (book) => {
  if (currentBook.value) {
    edit(book);
  } else {
    add(book);
  }
  refreshAndUpdate();
};

const add = (book) => {
  bookKeeper.createItem(book);
  successNoty('Книга добавлена');
};

const edit = (book) => {
  bookKeeper.updateItem(book);
  successNoty('Книга изменена');
};

const remove = (book) => {
  bookKeeper.deleteItem(book.id);
  successNoty('Книга удалена');
  refreshAndUpdate();
};

const booksCount = computed(() => bookList.value.length);

const filteredBookList = computed(() => {
  const list = bookList.value.filter((book) =>
    Object.entries(book)
      .filter((e) => e[0] !== 'id')
      .some((e) =>
        e[1].toString().toLowerCase().includes(searchString.value.toLowerCase())
      )
  );
  list.sort(sortFunctions[sortBy.value]);
  return list;
});

const clearSearchString = () => searchString.value = ''
</script>

<template>
  <Transition>
    <BookDialog
      @cancel="refresh"
      @save="saveBook"
      @delete="remove"
      v-if="showModal"
      :book="currentBook"
    />
  </Transition>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <svg class="header__logo">
          <use href="./assets/sprites.svg#logo"></use>
        </svg>
        <MyInput
          class="header__search"
          placeholder="Найти ту самую книгу"
          v-model="searchString"
        >
          <template #prepend-icon>
            <svg>
              <use href="./assets/sprites.svg#magnify"></use>
            </svg>
          </template>
          <template #append-icon>
            <svg v-if="searchString" @click="clearSearchString">
              <use href="./assets/sprites.svg#cross"></use>
            </svg>
          </template>
        </MyInput>

        <!-- <MyButton class="header__search-button">
          <use href="./assets/sprites.svg#magnify"></use>
        </MyButton> -->
        <!-- <MyInput
          class="header__search header__search_mini"
          placeholder="Крига"
          is-success
        >
          <template #prepend-icon>
            <svg>
              <use href="./assets/sprites.svg#cross"></use>
            </svg>
          </template>
        </MyInput> -->
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
          <use href="./assets/sprites.svg#add"></use>
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
            <use href="./assets/sprites.svg#add"></use>
          </MyButton>
        </div>
      </div>
    </div>
  </header>
  <main>
    <section class="book-list">
      <div class="container">
        <p v-if="!filteredBookList.length">По вашему запросу ничего не найдено</p>
        <ul v-else>
          <li class="book" v-for="book in filteredBookList">
            <div class="book__main">
              <h2 class="book__title">
                {{ book.title }}
              </h2>
              <MyButton class="book__edit-button" @click="openToEdit(book)">
                <use href="./assets/sprites.svg#edit"></use>
              </MyButton>
            </div>

            <p class="book__info">
              <span>{{ book.author }}</span>
              <span>{{ book.year }}</span>
              <span>{{ book.genre }}</span>
            </p>
          </li>
        </ul>
        
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease, transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0, 1);
}
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

.book-list {
  gap: 10px;
  padding-top: 15px;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 13px;
    @media screen and (max-width: 768px) {
      gap: 16px;
    }
    @media screen and (max-width: 320px) {
      gap: 6px;
    }
  }
}
.book {
  list-style-type: none;
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 10px 12px 15px 14px;
  margin: 0;
  @media screen and (max-width: 480px) {
    padding: 10px 12px 13px 13px;
  }
  &:hover {
    border: none;
    background-color: var(--color-border);
    padding: 12px 14px 17px 16px;
    @media screen and (max-width: 480px) {
      padding: 12px 14px 15px 15px;
    }
  }
  &__main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__title {
    padding-top: 4px;
    padding-bottom: 9px;
  }
  &__edit-button {
    padding: 0;
    padding-top: 5px;
    background-color: inherit;
    &:hover {
      color: var(--color-text);
    }
  }
  &__info {
    padding-top: 0;
    display: flex;
    gap: 18px;
    cursor: default;
    @media screen and (max-width: 480px) {
      gap: 9px;
    }
  }
}
</style>
