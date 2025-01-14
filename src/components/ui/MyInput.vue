<script setup>
const model = defineModel();
const {label} = defineProps({
  label: String,
  errorMessage: String,
  placeholder: String,
});
</script>

<template>
  <label class="input">
    <slot>
      <div class="input__label">
        {{ label }}
      </div>
    </slot>
    <input
      type="text"
      v-model="model"
      class="input__input input__input_state_error"
      :placeholder="placeholder"
    />
    <div class="input__error note" v-if="errorMessage">{{ errorMessage }}</div>
  </label>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 496px;
  gap: 7px;
  @media screen and (max-width: 1024px) {
    gap: 4px;
  }

  &__input {
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
    &_state_success {
      border: 2px solid var(--color-success);
    }
    &_state_error {
      border: 2px solid var(--color-danger);
    }
    &_state_error,
    &_state_success {
      padding: 11px;
      @media screen and (max-width: 1024px) {
        padding: 9px;
      }
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
