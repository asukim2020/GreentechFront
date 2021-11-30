import { createStore } from 'vuex'

import company from './company'
import dataLogger from './dataLogger'
import measureData from './measureData'
import fileList from './fileList'
import dynamicFile from './dynamicFile'

export default createStore({
  modules: {
    company: company,
    dataLogger: dataLogger,
    measureData: measureData,
    fileList: fileList,
    dynamicFile: dynamicFile
  }
})
