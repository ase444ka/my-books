import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const searchString = ref('')
  const sortBy = ref('default')
  function clearSearchString() {
    searchString.value = ''
  }

  return { searchString, sortBy, clearSearchString }
})
