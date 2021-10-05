import axios from 'axios'
// import https from 'https'
// import store from '../store'

const config = {
   // baseUrl: 'http://localhost:8080/'
   baseUrl: 'http://172.30.1.48:8080/'
   // baseUrl: "http://3.38.61.109:8080/"
}

// const agent = new https.Agent({ rejectUnauthorized: false })

// const instance= axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// });

function callApi(method, url, params, data) {
   console.log(`url: ${url}`);
   let token = JSON.parse(localStorage.getItem('user'));
   const headers = {
      'Authorization': `Bearer ${token}`
   }
   return axios({
      method: method,
      url: url,
      headers: headers,
      params: params,
      data: data
   })
}

function login(id, pw) {
   console.log('login api');
   return axios({
      method: 'post',
      url: config.baseUrl + 'authenticate/login',
      headers: {},
      data: {
         username: id,
         password: pw,
      },
      // httpsAgent: agent
   })
}

function getDataLoggers(companyId) {
   return callApi(
         'get', 
         `${config.baseUrl}dataLogger/${companyId}`,
         null,
         null
      )
}

function getMeasureDataList(dataLoggerId, from, to) {
   if (from !== null, to !== null) {
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
         `${config.baseUrl}measureData/${dataLoggerId}`, 
         param,
         null
      )
      
   } else {
         let now = new Date()
         const param = {
            from: dateToyyyyMMdd(new Date(
               now.getFullYear(),
               now.getMonth(),
               now.getDate(),
               0,0,0,0)),
            to: dateToyyyyMMdd(new Date(
               now.getFullYear(),
               now.getMonth(),
               now.getDate(),
               23,59,59,999))
         }

      return callApi(
         'get', 
         `${config.baseUrl}measureData/${dataLoggerId}`, 
         param,
         null
      )
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
   console.log(`date: ${dateString}`);
   return dateString
}

const fillZero = (width, str) => {
   return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
}

export {
   login,
   getDataLoggers,
   getMeasureDataList
}