<script setup>
import {computed} from 'vue';

const {text} = defineProps({
  text: {
    type: String,
    default: '',
  },
});

const buttonClass = computed(() => (text ? '' : 'button_type_icon'));
</script>

<template>
  <button class="button" :class="buttonClass">
    <svg class="button__icon">
      <slot></slot>
    </svg>
    <span class="button__text" v-if="text">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  outline: none;
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--color-success);
  color: var(--color-background);
  display: flex;
  align-items: center;
  @media screen and (max-width: 1024px) {
    padding: 8px 12px;
    gap: 0px;
  }
  &__icon {
    opacity: 0.5;
    width: 25px;
    height: 25px;
  }
  &:hover {
    background-color: var(--color-success-active);
    .button__icon {
      opacity: 1;
    }
  }

  &_type_icon {
    background-color: var(--color-border);
    color: var(--color-paragraph);
    padding: 12px 13px;
    @media screen and (max-width: 1024px) {
      padding: 8px 9px;
      gap: 0px;
    }
    &:hover {
      background-color: var(--color-border);
    }
    .button__icon {
      opacity: 1;
    }
    &:hover {
      .button__icon {
        color: var(--color-danger);
      }
    }
  }
}
</style>
