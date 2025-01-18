<script setup>
const emit = defineEmits(['cancel', 'save', 'delete'])

const process = (e) => {
  if(e.target.matches('.modal__backdrop')) {
    emit('cancel')
  }
}

</script>

<template>
  <div class="modal__backdrop" @click="process">
    <div class="modal__window">
      <div class="modal__title">
        <h1>Добавить книгу</h1>
        <MyButton class="modal__close" @click="$emit('cancel')">
          <use href="../assets/sprites.svg#cross"></use>
        </MyButton>
      </div>
      <p class="modal__tooltip">Заполните все поля и добавьте книгу в список</p>
      <form action="" class="modal__form">
        <MyInput label="Название" placeholder="Название произведения" />
        <MyInput label="Автор" placeholder="Имя и фамилия автора" />
        <MyInput label="Год" placeholder="Год выпуска" />
        <MyInput label="Жанр" placeholder="Добавьте жанр произведения" />
        <MyCheckbox>
          Я согласен с условиями <a href="#">политики конфиденциальности</a>
        </MyCheckbox>
        <div class="modal__actions">
          <MyButton type="submit" text="Добавить">
            <use href="../assets/sprites.svg#add"></use>
          </MyButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

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
}
</style>
