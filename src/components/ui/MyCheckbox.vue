<script setup>
const model = defineModel();
const {label} = defineProps({
  label: String,
});
</script>

<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" />
    <div class="checkbox__state">
      <div class="checkbox__control">
        <svg class="checkbox__icon">
          <use href="../../assets/sprites.svg#check"></use>
        </svg>
      </div>
      <div class="checkbox__label">
        <slot>
          {{ label }}
        </slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  &__input {
    position: absolute;
    outline: none;
    border: none;
    clip: rect(0, 0, 0, 0);
    opacity: 0;
  }

  :slotted(a) {
    letter-spacing: 0.2px;
    border-bottom: 1px solid var(--color-paragraph);
    padding-bottom: 0px;
  }

  &__state {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    @media screen and (max-width: 1024px) {
      gap: 10px;
    }
  }
  &__control {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    background: var(--color-background);
    border: 2px solid var(--color-paragraph);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1024px) {
      width: 14px;
      height: 14px;
    }
  }
  &__icon {
    color: var(--color-background);
    visibility: hidden;
    width: 17px;
    height: 9px;
    transform: scale(1.6);
    margin-left: 4px;
    @media screen and (max-width: 1024px) {
      width: 17px;
      height: 9px;
      transform: scale(1);
      margin-left: 1px;
    }
  }

  &__label {
    user-select: none;
  }

  &__input:checked + &__state &__control {
    border-color: var(--color-success);
    background-color: var(--color-success);
  }
  &__input:checked + &__state &__icon {
    visibility: visible;
  }

  &__input:disabled + &__state {
    cursor: auto;
  }

  &__input:disabled + &__state &__control {
    border-color: var(--grey-2);
    background-color: var(--grey-2);
  }

  &__input:disabled + &__state &__label {
    color: var(--grey-2);
  }
}
</style>
