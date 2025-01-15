<script setup>
import {computed, ref, onMounted} from 'vue';

const {type, isSuccess} = defineProps({
  text: {
    type: String,
    required: true,
  },
  isSuccess: {
    type: Boolean,
    default: true,
  },
});

const showToast = ref(false);

const hideToast = () => showToast.value = false

onMounted(() => {
  showToast.value = true;
  setTimeout(() => hideToast(), 4500)
});

const stateClass = computed(() =>
  isSuccess ? 'toast_state_success' : 'toast_state_error'
);
</script>

<template>
  <Transition>
    <div class="toast" :class="stateClass" v-show="showToast">
      <svg class="toast__icon">
        <use href="../../assets/sprites.svg#success"></use>
      </svg>
      <div class="toast__text">
        {{ text }}
      </div>
      <button class="toast__button" @click="hideToast">
        <svg>
          <use href="../../assets/sprites.svg#cross"></use>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 11px 11px 11px 16px;
  gap: 14px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto fit-content(300px) auto;
  color: var(--color-background);
  &_state {
    &_success {
      background-color: var(--color-success);
    }
    &_error {
      background-color: var(--color-danger);
    }
  }
  &__icon {
    width: 20px;
    height: 20px;
    transform: scale(1.2);
    transform-origin: top left;
  }
  &__button {
    background-color: inherit;
    border: none;
    outline: none;
    color: var(--color-background);
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
