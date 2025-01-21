<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue';


const {book} = defineProps({
  book: [Object, null],
});
const emit = defineEmits(['cancel', 'save', 'delete']);
import {required, isYear, isText} from '@/api/validatiions.js';

const currentBook = ref(
  book ? {...book} : {
    title: '',
    author: '',
    year: null,
    genre: '',
  }
);

const attemptedToSubmit = ref(false)

const keyupHandler = e => {
  if (e.key === 'Enter') {
    setAllDirty()
  }
  if (e.key === 'Escape') {
    emit('cancel')
  }
}

onMounted(() => {
  document.addEventListener('keyup', keyupHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', keyupHandler)
})

const isAgree = ref(false);

const validations = {
  title: {
    validate: required,
    errorMessage: 'обязательное поле',
  },
  author: {
    validate: required,
    errorMessage: 'обязательное поле',
  },
  year: {
    validate: isYear,
    errorMessage: 'укажите год',
  },
  genre: {
    validate: isText,
    errorMessage: 'разрешены только буквы, пробелы и дефисы',
  },
};

const cleans = ref(Object.fromEntries(Object.keys(currentBook.value).map((k) => [k, true])));

const setDirty = (field) => (cleans.value[field] = false);

const states = computed(() => {
  const states = {};
  Object.keys(validations).forEach((key) => {
    states[key] = cleans.value[key]
      ? 'clean'
      : validations[key].validate(currentBook.value[key])
      ? 'success'
      : 'error';
  });
  return states;
});

const isDeleting = ref(false);

const processMouse = (e) => {
  if (e.target?.matches('.modal__backdrop')) {
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
  isDeleting.value = true;
};

const cancelDeleting = () => {
  isDeleting.value = false;
};



const savingDisabled = computed(() => {
  return !isAgree.value || Object.entries(currentBook.value).filter(e => e[0] !== 'id').some(e =>  !validations[e[0]].validate(e[1]))
})


const setAllDirty = () => {
  attemptedToSubmit.value = true
  Object.keys(currentBook.value).forEach((key) => {
    setDirty(key)
  })
}

const trySaving = () => {
  if (savingDisabled.value) return
  emit('save', currentBook.value)
}



</script>

<template>
  <div class="modal__backdrop" @mousedown="processMouse"  @keyup.enter="setAllDirty"  @keyup.esc="$emit('cancel')" @submit="trySaving">
    <div class="modal__window">
      <div class="modal__title">
        <h1>{{ title }}</h1>
        <MyButton class="modal__close" @click="$emit('cancel')">
          <use href="../assets/sprites.svg#cross"></use>
        </MyButton>
      </div>
      <p class="modal__tooltip">{{ tooltip }}</p>
      <form class="modal__form" @submit.prevent="trySaving">
        <MyInput
          :state="states.title"
          :errorMessage="validations.title.errorMessage"
          @blur="setDirty('title')"
          label="Название"
          placeholder="Название произведения"
          v-model="currentBook.title"
          tabindex="1"
        />
        <MyInput
          :state="states.author"
          :errorMessage="validations.author.errorMessage"
          @blur="setDirty('author')"
          label="Автор"
          placeholder="Имя и фамилия автора"
          v-model="currentBook.author"
          tabindex="2"
        />
        <MyInput
          :state="states.year"
          :errorMessage="validations.year.errorMessage"
          @blur="setDirty('year')"
          label="Год"
          placeholder="Год выпуска"
          v-model="currentBook.year"
          tabindex="3"
        />
        <MyInput
          :state="states.genre"
          :errorMessage="validations.genre.errorMessage"
          @blur="setDirty('genre')"
          label="Жанр"
          placeholder="Добавьте жанр произведения"
          v-model="currentBook.genre"
          tabindex="4"
        />
          
        <MyCheckbox v-model="isAgree" :isError="!isAgree && attemptedToSubmit" tabindex="5" lol="pop">
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
          <MyButton type="submit" text="Сохранить"    @click="setAllDirty">
            <use href="../assets/sprites.svg#add"></use>
          </MyButton>
        </div>
        <div class="modal__actions" v-else>
          <MyButton type="submit" text="Добавить"  @click="setAllDirty">
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
