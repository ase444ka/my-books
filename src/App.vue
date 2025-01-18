<script setup>
import {RouterLink, RouterView} from 'vue-router';
import {ref, onMounted} from 'vue';
import {inject} from 'vue';
const successNoty = inject('successNoty');
const errorNoty = inject('errorNoty');
import BookDialog from '@/components/BookDialog.vue'

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false
}

const openModal = () => {
  showModal.value = true
}


onMounted(() => {
  successNoty('Приветик!');
  setTimeout(() => {
    errorNoty('вот беда :()');
  }, 7000);
});
const ch = ref('');
</script>

<template>
  <Transition>
  <BookDialog @cancel="closeModal"  v-if="showModal"/>

  </Transition>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <svg class="header__logo">
          <use href="./assets/sprites.svg#logo"></use>
        </svg>
        <MyInput class="header__search" placeholder="Крига">
          <template #prepend-icon>
            <svg>
              <use href="./assets/sprites.svg#magnify"></use>
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
      <div class="header__bottom">
        <h1 class="header__title">Книги в каталоге <span>3</span></h1>
        <MyButton class="header__button" text="Добавить книгу">
          <use href="./assets/sprites.svg#add"></use>
        </MyButton>
      </div>
    </div>
  </header>
  <main>
    <section class="book-list">
      <div class="container">
        <ul>
          <li class="book">
            <div class="book__main">
              <h2 class="book__title">
                Как разговаривать с кем угодно, когда угодно, где угодно
              </h2>
              <MyButton class="book__edit-button">
                <use href="./assets/sprites.svg#edit"></use>
              </MyButton>
            </div>

            <p class="book__info">
              <span>Ларри кинг</span>
              <span>2009</span>
              <span>детектив</span>
            </p>
          </li>

          <li class="book">
            <div class="book__main">
              <h2 class="book__title">
                Больше, чем просто красивая. 12 тайных сил женщины, перед
                которой невозможно устоять
              </h2>
              <MyButton class="book__edit-button">
                <use href="./assets/sprites.svg#edit"></use>
              </MyButton>
            </div>

            <p class="book__info">
              <span>Ларри кинг</span>
              <span>2009</span>
              <span>детектив</span>
            </p>
          </li>
        </ul>
      </div>
  <MyButton text="показать модалку" @click="openModal"/>

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
  transform: scale(0,1);
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
    @media screen and (max-width: 480px) {
      padding-top: 11px;
      padding-bottom: 13px;
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
