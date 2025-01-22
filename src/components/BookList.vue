<script setup>
import {ref, inject, computed} from 'vue';
import bookKeeper from '@/api/book-keeper.js';
const successNoty = inject('successNoty');
const errorNoty = inject('errorNoty');

import BookDialog from '@/components/BookDialog.vue';

import {useSearchStore} from '@/stores/search.js';
import {useBooksStore} from '@/stores/books.js';
import {storeToRefs} from 'pinia';



const searchStore = useSearchStore();
const {searchString, sortBy} = storeToRefs(searchStore);

const booksStore = useBooksStore();
const {bookList, isEditing, booksCount} = storeToRefs(booksStore);

const {updateBookList} = booksStore;

const sortFunctions = {
  default: (a, b) => a.id - b.id,
  year: (a, b) => a.year - b.year,
  author: (a, b) => a.author.localeCompare(b.author),
  title: (a, b) => a.title.localeCompare(b.title),
};

const currentBook = ref(null);


const openToEdit = (book) => {
  currentBook.value = book;
  isEditing.value = true;
};

const refresh = () => {
  currentBook.value = null;
  isEditing.value = false;
};

const refreshAndUpdate = () => {
  refresh();
  updateBookList()
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
</script>

<template>
  <main>
    <Transition>
    <BookDialog
      @cancel="refresh"
      @save="saveBook"
      @delete="remove"
      v-if="isEditing"
      :book="currentBook"
    />
  </Transition>
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
                <use href="@/assets/sprites.svg#edit"></use>
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
