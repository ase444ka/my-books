import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import bookKeeper from '@/api/book-keeper.js';

export const useBooksStore = defineStore('books', () => {
  const bookList = ref(bookKeeper.getList());
  const isEditing = ref(false);

  function updateBookList() {
    bookList.value = bookKeeper.getList();
  }

  const booksCount = computed(() => bookList.value.length);

  return {bookList, isEditing, updateBookList, booksCount};
});
