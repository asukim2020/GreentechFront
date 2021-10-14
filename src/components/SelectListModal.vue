<template>
   <transition name="modal">
   <div class="modal-mask">
      <div class="modal-wrapper">
      <div class="modal-container">

         <div class="modal-header">
            <h3>{{getHeader}}</h3>
         </div>
         <ul>
            <li v-for="(item, index) in selectList" v-bind:key="item" class="shadow" @click="itemClick(index)">
               {{item}}
            </li>

            <li class="shadow" @click="dismissAlert">
               닫기
            </li>
         </ul>
      </div>
      </div>
   </div>
</transition>
</template>

<script>
import { computed } from 'vue'
export default {

emits: ['item-click', 'dismiss'],
props: {
   header: String,
   list: []
},

setup(props, { emit }) {
   const getHeader = computed({
      get: () => props.header
   })

   const selectList = computed({
      get: () => props.list
   })

   const itemClick = (index) => {
      emit('item-click', index)
   }

   const dismissAlert = () => {
      emit('dismiss')
   }

   return {
      getHeader,
      selectList,
      itemClick,
      dismissAlert
   }
}

}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px 0.01px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

</style>