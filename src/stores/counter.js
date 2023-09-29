import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Adi Nugroho')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  const decrement = () => {
    count.value--
  }

  return { count,name, doubleCount, increment,decrement }
})
