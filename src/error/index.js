function authErrorHandle(promise, router) {
   promise
   .then(response => {
      if (response.response) {
         if (response.response.status == 401) {
            router.replace("/")
            alert('로그인 후 일정 시간이 지나 자동 로그아웃되었습니다.')
         }
      }
   })
}

// function errorLog(error) {
//    if (error.response) {
//       console.log('response');
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//    } else if (error.request) {
//       console.log('request');
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//    } else {
//       console.log('else');
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//    }
//    console.log(error.config);
// }

export {
   authErrorHandle
}