import axios from 'axios'
// import https from 'https'
// import store from '../store'

const config = {
   // baseUrl: 'http://172.30.1.48:8080/'
   baseUrl: 'http://localhost:8080/'
   // baseUrl: "http://3.38.61.109:8080/"
   // baseUrl: "https://mutiscanback.link/"
}

// const agent = new https.Agent({ rejectUnauthorized: false })

// const instance= axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// });

function callApi(method, url, params, data) {
   // console.log(`url: ${url}`);
   return callApiAllUrl(
      method,
      config.baseUrl + url,
      params,
      data
   )
}

function callApiAllUrl(method, url, params, data) {
   // console.log(`url: ${url}`);
   let token = JSON.parse(localStorage.getItem('user'));
   const headers = {
      'Authorization': `Bearer ${token}`
   }
   return axios({
      method: method,
      url: url,
      // url: '/api/' + url,
      headers: headers,
      params: params,
      data: data
   })
}

// function errorHandle(error) {
//     try {
//       //  TODO:- 에러 코드 정리 할 것 - 인증  실패시 - 로그인화면으로 이동하는 기능 등 추가
//       console.log(error)
//       var errorStatus = error.response.status;

//       if(errorStatus == '400') vue.$awn.alert(error.response.data);
//       if(errorStatus == '401') vue.$awn.alert('인증에 실패했습니다.');
//       if(errorStatus == '403') vue.$awn.alert('권한이 없습니다.');
//       if(errorStatus == '500') vue.$awn.alert('서버에서 오류가 발생하였습니다.');
      
//       // var errorStatus = error.response.status;
//       // if(errorStatus == '401')
//       return error.response;
//     } catch(err) {
//       console.error('[_axios.interceptors.response] error : '+err.message);
//     }
// }

function login(id, pw) {
   return axios({
      method: 'post',
      url: config.baseUrl + 'authenticate/login',
      // url: '/api/' + 'authenticate/login',
      headers: {},
      data: {
         username: id,
         password: pw,
      },
      // httpsAgent: agent
   })
}

function uploadFcmToken(companyId, fcmToken) {
   return callApi(
      'post',
      `authenticate/fcm/${companyId}`,
      {fcmToken},
      null
   )
}

function getDataLoggers(companyId) {
   return callApi(
         'get', 
         `dataLogger/${companyId}`,
         null,
         null
      )
}

function getDataLogger(dataLoggerId) {
   return callApi(
      'get',
      `dataLogger`,
      {dataLoggerId},
      null
   )
}

function getLastDatas(dataLoggerId, count) {
      const param = {
         count
      }

      return callApi(
         'get', 
         `measureData/last/${dataLoggerId}`, 
         param,
         null
      )
}

function getFileList(dataLoggerId) {
         return callApi(
         'get', 
         `file/${dataLoggerId}`, 
         null,
         null
      )
}

function getDynamicFile(url) {
   return callApiAllUrl(
      'get', 
      url, 
      null,
      null
   )
}

function getMeasureDataList(dataLoggerId, from, to) {
   if (from !== null && to !== null) {
      const param = {
            from: dateToyyyyMMdd(from),
            to: dateToyyyyMMdd(new Date(
               to.getFullYear(),
               to.getMonth(),
               to.getDate(),
               23,59,59,999))
         }

      return callApi(
         'get', 
         `measureData/${dataLoggerId}`, 
         param,
         null
      )
      
   } else {
         return getLastDatas(dataLoggerId, 20)
   }
}

const dateToyyyyMMdd = (date) => {
   const year = fillZero(2, String(date.getFullYear()))
   const month = fillZero(2, String(date.getMonth() +1))
   const day = fillZero(2, String(date.getDate()))
   
   const hour = fillZero(2, String(date.getHours()))
   const min = fillZero(2, String(date.getMinutes()))
   const sec = fillZero(2, String(date.getSeconds()))
   
   const milli = fillZero(3, String(date.getMilliseconds()))
   
   const dateString = `${year}-${month}-${day}T${hour}:${min}:${sec}.${milli}`
   // console.log(`date: ${dateString}`);
   return dateString
}

const fillZero = (width, str) => {
   return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
}

export {
   login,
   uploadFcmToken,
   getDataLoggers,
   getDataLogger,
   getMeasureDataList,
   getLastDatas,
   getFileList,
   getDynamicFile
}