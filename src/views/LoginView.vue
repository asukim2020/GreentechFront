<template>
  <div class="login-form">
    <form>
      <input type="text" name="email" class="text-field" placeholder="아이디" v-model="user.id">
      <input type="password" name="password" class="text-field" placeholder="비밀번호" v-model="user.pw">
      <input type="submit" value="로그인" class="submit-btn" v-on:click.prevent="clickLogin">
    </form>
 
    <!-- <div class="links">
      <a href="#">비밀번호를 잊어버리셨나요?</a>
    </div> -->
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
import { fcmToken } from '../fcm/firebase'

const company = 'company'

export default {
   setup () {

      const store = useStore()
      const router = useRouter()

      const user = reactive({
         id: "",
         pw: "",
      })

      const clickLogin = () => { 
         console.log(fcmToken);
         store.dispatch(`${company}/actionLogin`, user)
         .then(response => {
            if (typeof(response) == "number") {
               // actionUploadFcmToken
               const parmas = {
                  companyId: response,
                  fcmToken
               }
               console.log("call actionUploadFcmToken");
               store.dispatch(`${company}/actionUploadFcmToken`, parmas)
               router.push(`/list/${response}`)
            } else if (response.response) {
               console.log(response.response);
               alert('아이디 또는 비밀번호가 일치하지 않습니다.')
            } else if (response.request) {
               console.log(response.request);
               alert('서버와 연결할 수 없습니다.')
            } else {
               alert(response.message)
            }
         })
      }

      return {
         user,
         clickLogin
      }
   }
}
</script>

<style scoped>
* {
   box-sizing: border-box;
   font-family: 'Noto Sans KR', sans-serif;
   border-radius: 5px;
}
 
body {
   margin: 0;
   background-color: #1BBC9B;
}
 
.login-form {
   position: absolute;     
   width: 300px;
   background-color: #ECEFF1;
   top: 50%;
   left: 50%;
   padding: 20px;
   text-align: center;
   border: none;
   margin: -87.5px 0 0 -150px;
}
 
.text-field {
   font-size: 14px;
   padding: 10px;
   border: none;
   width: 260px;
   margin-bottom: 10px;
 
}
 
.submit-btn {
   font-size: 14px;
   border: none;
   padding: 10px;
   width: 260px;
   background-color: #448AFF;
   /* margin-bottom: 30px; */
   color: white;
}
 
.links {
   text-align: center;
}
 
.links a {
   font-size: 12px;
   color: #9B9B9B;
}
</style>