const ErrorPopupStore = {
    namespaced: true,
    state: {
        popupTitle: 'title',
        popupText: 'text',
    },
    getters: {
        getPopupTitle: state => state.popupTitle,
        getPopupText: state => state.popupText,
    },
    mutations: {
        setPopupTitle: (state, title) =>  state.popupTitle = title,
        setPopupText: (state, text) =>  state.popupText = text
    },
    actions: {
        createErrorPopup({commit}, {title, text}) {
            commit('setPopupTitle', title)
            commit('setPopupText', text)
        },
        deleteErrorPopup({commit}) {
            commit('setPopupTitle', '')
            commit('setPopupText', '')
        }
    }
}

export default ErrorPopupStore
