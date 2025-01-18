<script setup>
import {computed} from 'vue';

const model = defineModel();

const {label, errorMessage, placeholder, isSuccess} = defineProps({
  label: String,
  errorMessage: String,
  placeholder: String,
  isSuccess: {
    type: Boolean,
    default: false,
  }
});

const stateClass = computed(() => {
  if (errorMessage) {
    return 'input__input_state_error'
  }
  if (isSuccess) {
    return 'input__input_state_success'
  } 
  return ''
})

</script>

<template>
  <label class="input">
    <slot>
      <div class="input__label">
        {{ label }}
      </div>
    </slot>
    <div class="input__input" :class="stateClass">
      <slot name="prepend-icon"></slot>

      <input type="text" v-model="model" :placeholder="placeholder" />
      <slot name="append-icon"></slot>
    </div>

    <div class="input__error note" v-if="errorMessage">{{ errorMessage }}</div>
  </label>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 7px;
  @media screen and (max-width: 1024px) {
    gap: 4px;
  }

  &__input {
    display: flex;
    padding: 12px;
    border: none;
    outline: none;
    background: var(--color-border);
    border-radius: 8px;
    color: var(--color-text);
    @media screen and (max-width: 1024px) {
      padding: 10px;
    }
    &::placeholder {
      text-transform: capitalize;
    }
    &_state_error,
    &_state_success {
      padding: 11px;
      @media screen and (max-width: 1024px) {
        padding: 9px;
      }
    }
    &_state_success {
      border: 2px solid var(--color-success);
    }
    &_state_error {
      border: 2px solid var(--color-danger);
    }

    input,
    input:focus,
    input:focus-visible {
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      background-color: inherit;
    }

    :slotted(svg) {
      color: var(--color-paragraph);
      width: 20px;
      height: 20px;
    }
  }
  &__error {
    color: var(--color-danger);
    padding-left: 17px;
    @media screen and (max-width: 1024px) {
      margin-top: -3px;
    }
  }
}
</style>
