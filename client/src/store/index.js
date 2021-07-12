import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/User'
import ErrorPopup from "./modules/ErrorPopup";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { User, ErrorPopup }
})
