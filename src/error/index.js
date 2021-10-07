function authErrorHandle(promise, router) {
   promise
   .then(response => {
      if (response.response) {
         if (response.response.status == 401) {
            router.push("/")
            alert('로그인 후 일정 시간이 지나 자동 로그아웃되었습니다.')
         }
      }
   })
}

export {
   authErrorHandle
}