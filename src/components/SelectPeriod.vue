<template>
<div class="root">
   <datepicker
      class="picker"
      v-model="fromValue"
      placeholder="from"
   ></datepicker>

   <datepicker
      class="picker"
      v-model="toValue"
      placeholder="to"
   ></datepicker>

   <button v-on:click.prevent="submit">submit</button>
</div>
</template>

<script>
import { computed } from 'vue'
import Datepicker from 'vue3-datepicker'

export default {
   components: {
      Datepicker,
   },
   props: {
      from: null,
      to: null
   },
   emits: ['set-from', 'set-to','submit-click'],
   setup(props, { emit }) {

      const fromValue = computed({
         get: () => props.from,
         set: value => {
            emit('set-from', value)
         }
      })

      const toValue = computed({
         get: () => props.to,
         set: value => {
            emit('set-to', value)
         }
      })

      const submit = () => {
         emit('submit-click')
      }

      return {
         fromValue,
         toValue,
         submit
      }
   }
}  
</script>

<style scoped>
.root {
   /* display: flex; */
   padding: 1rem;
   text-align: center; 
}
.picker {
  color: #3c4a5a;
}

</style>