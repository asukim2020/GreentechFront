import { createStore } from 'vuex'

import company from './company'
import dataLogger from './dataLogger'
import measureData from './measureData'

export default createStore({
  modules: {
    company: company,
    dataLogger: dataLogger,
    measureData: measureData
  }
})
