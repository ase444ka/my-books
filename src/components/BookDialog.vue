<script setup>
import {ref, computed} from 'vue';
import bookKeeper from '@/api/book-keeper.js';
const {book} = defineProps({
  book: Object || null,
});
const emit = defineEmits(['cancel', 'save', 'delete']);

const currentBook = ref(
  book || {
    title: '',
    author: '',
    year: null,
    genre: '',
  }
);

const isDeleting = ref(false);

const process = (e) => {
  if (e.target.matches('.modal__backdrop')) {
    console.log('lllll');
    emit('cancel');
  }
};

const title = computed(() => {
  return book ? 'Редактировать книгу' : 'Добавить книгу';
});

const tooltip = computed(() => {
  return book
    ? 'Внесите изменение в карточке'
    : 'Заполните все поля и добавьте книгу в список';
});

const startDeleting = () => {
  console.log('deletinggg');
  isDeleting.value = true;
};

const cancelDeleting = () => {
  isDeleting.value = false;
};
</script>

<template>
  <div class="modal__backdrop" @click="process">
    <div class="modal__window">
      <div class="modal__title">
        <h1>{{ title }}</h1>
        <MyButton class="modal__close" @click="$emit('cancel')">
          <use href="../assets/sprites.svg#cross"></use>
        </MyButton>
      </div>
      <p class="modal__tooltip">{{ tooltip }}</p>
      <form class="modal__form" @submit.prevent="$emit('save', currentBook)">
        <MyInput
          label="Название"
          placeholder="Название произведения"
          v-model="currentBook.title"
        />
        <MyInput
          label="Автор"
          placeholder="Имя и фамилия автора"
          v-model="currentBook.author"
        />
        <MyInput
          label="Год"
          placeholder="Год выпуска"
          v-model="currentBook.year"
        />
        <MyInput
          label="Жанр"
          placeholder="Добавьте жанр произведения"
          v-model="currentBook.genre"
        />
        <MyCheckbox>
          Я согласен с условиями <a href="#">политики конфиденциальности</a>
        </MyCheckbox>
        <Transition>
          <div class="modal__alert" v-if="isDeleting">
            <div class="modal__alert-message">Точно удалить?</div>
            <div class="modal__alert-actions">
              <MyButton text="Удалить" @click="$emit('delete', book)">
                <use href="../assets/sprites.svg#trash"></use>
              </MyButton>
              <MyButton text="Отмена" type="button" @click="cancelDeleting">
                <use href="../assets/sprites.svg#undo"></use>
              </MyButton>
            </div>
          </div>
        </Transition>

        <div class="modal__actions" v-if="book">
          <MyButton type="button" @click="startDeleting">
            <use href="../assets/sprites.svg#trash"></use>
          </MyButton>
          <MyButton type="submit" text="Сохранить">
            <use href="../assets/sprites.svg#add"></use>
          </MyButton>
        </div>
        <div class="modal__actions" v-else>
          <MyButton type="submit" text="Добавить">
            <use href="../assets/sprites.svg#add"></use>
          </MyButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.05s ease, transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}

.modal {
  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(80%, 80%, 80%, 80%);
    z-index: 10;
    display: grid;
    place-items: center;
  }
  &__window {
    z-index: 100;
    overflow: auto;
    min-width: 45%;
    max-width: 850px;
    max-height: 95vh;
    background-color: var(--color-background);
    padding: 32px 27px 33px 30px;
    border-radius: 16px;
    @media screen and (max-width: 768px) {
      min-width: 65%;
      max-width: 660px;
    }
    @media screen and (max-width: 480px) {
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
      padding-top: 29px;
    }
    @media screen and (max-width: 320px) {
      padding: 21px 16px 30px 20px;
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    h1 {
      margin-top: -3px;
    }
  }
  &__close {
    padding: 0;
    background-color: inherit;
    transform: scale(1.2);
    &:hover {
      color: var(--color-text);
      background-color: inherit;
    }
  }
  &__tooltip {
    margin-top: 6px;
    @media screen and (max-width: 1024px) {
      margin-top: -3px;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 20px;
    @media screen and (max-width: 1024px) {
      padding-top: 16px;
    }
    .checkbox {
      padding-top: 9px;
    }
  }
  &__actions {
    padding-top: 11px;
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 480px) {
      .button {
        flex-grow: 1;
      }
    }
  }
  &__alert {
    background: var(--color-border);
    border-radius: 4px;
    &-message {
      color: var(--color-danger);
    }
    &-actions {
      display: flex;
      justify-content: space-between;
      .button {
        background-color: var(--color-border);

        &:first-child {
          border: 1px solid var(--color-danger);
          color: var(--color-danger);
        }
        &:last-child {
          border: 1px solid var(--color-success);
          color: var(--color-success);
        }
      }
    }
  }
}
</style>
