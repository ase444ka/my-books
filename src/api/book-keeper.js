export default {
  getLastId: () => +localStorage.getItem('lastId'),
  createList: () => localStorage.setItem('booklist', '[]'),

  getList: () => {
    const json = localStorage.getItem('bookList');
    if (!json) {
      this.createList()
    }
    return JSON.parse(json) || [];
  },

  getItem: (id) => {
    return this.getList().find(item => item.id === id)

  },

  createItem: (item) => {
    const id = this.getLastId() + 1;
    localStorage.setItem('lastId', id + '');
    const newItem = {
      id,
      item,
    };
    const list = [...this.getList(), newItem];
    localStorage.setItem('booklist', JSON.stringify(list));
  },

  updateItem: (item) => {
    const filteredList = this.getList().filter(list.id !== item.id)
    localStorage.setItem('booklist', JSON.stringify([...filteredList, item]))
  },

  deleteItem: (id) => {
    const filteredList = this.getList().filter(list.id !== id)
    localStorage.setItem('booklist', JSON.stringify(filteredList))
  }
};
