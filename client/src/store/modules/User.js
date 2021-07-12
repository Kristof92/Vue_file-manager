import { logInUser, createUser, getActualDomain, getUser, uploadPic, deletePic } from "@/services/user";
import router from "@/router";

const userStore = {
    namespaced: true,
    state: {
        profile: {
            _id: '',
            files: [],
            email: '',
            password: '',
            createdAt: '',
            updatedAt: '',
            __v: 0
        },
        uploadedSuccessfully: 1, // 1: initial, 2: success, 3: failure state
        maxFileCount: 11,
        totalUploadedData: 0,
        domainUsed: 'https://balinth-file-manager.herokuapp.com',
        errors: {
            login: null
        },
        processInProgress: false
    },
    getters: {
        getUserProfile: state => state.profile,
        getIsUploadedSuccessfully: state => state.uploadedSuccessfully,
        getMaxFileCount: state => state.maxFileCount,
        getTotalUploadedData: state => state.totalUploadedData,
        getDomainUsed: state => state.domainUsed,
        getProcessInProgress: state => state.processInProgress,

        getError: state => state.errors.login,
    },
    mutations: {
        setUser: (state, user) =>  state.profile = user,
        setIsUploadedSuccessfully: (state, input) =>  state.uploadedSuccessfully = input,
        setTotalUploadedData: (state, data) => state.totalUploadedData = data,
        setDomainUsed: (state, port) => state.domainUsed = port,
        setProcessInProgress: (state, value) => state.processInProgress = value,

        setError: (state, error) =>  state.errors.login = error,
    },
    actions: {
        // Login (existing user)
        async tryLogIn({commit, dispatch}, {email, password}) {
            const response = await logInUser({email, password})
            if (response) {
                if (response.statusCode === 200) {
                    commit('setUser', response.payload)
                    commit('setError', null)
                    dispatch('calculateTotal')
                    dispatch('getPort')
                    sessionStorage.setItem('_id', response.payload._id)
                    await router.replace('/Dashboard')
                } else {
                    commit('setError', response.payload)
                }
            } else {
                commit('setError', 'An error blocked you from reaching the app - please check back later.')
            }
        },

        // Create new user
        async createNewUser({commit, dispatch}, {email, password}) {
            const response = await createUser({email, password})
            if (response) {
                if (response.statusCode === 201) {
                    commit('setUser', response.payload)
                    commit('setError', null)
                    dispatch('calculateTotal')
                    dispatch('getPort')
                    sessionStorage.setItem('_id', response.payload._id)
                    await router.replace('/Dashboard')
                } else {
                    commit('setError', response.payload)
                }
            } else {
                commit('setError', 'An error blocked you from reaching the app - please check back later.')
            }
        },

        // Get port used
        async getPort({commit, dispatch}) {
            const response = await getActualDomain()
            if (response) {
                commit('setDomainUsed', response.payload)
            } else {
                dispatch('ErrorPopup/createErrorPopup', {title: 'Error while trying to fetch domain & port info', text: response.payload}, {root:true})
            }
        },

        // Calculate total uploaded filesize
        calculateTotal({commit, state}) {
            let total = 0
            for (let element of state.profile.files) {
                total += element.data.size
            }
            commit('setTotalUploadedData', total)
        },

        // Refresh profile
        async refreshProfile({commit, dispatch}) {
            const response = await getUser({userId: sessionStorage.getItem('_id')})
            if (response) {
                if (response.statusCode === 200) {
                    commit('setUser', response.payload)
                    dispatch('calculateTotal')
                    dispatch('getPort')
                } else {
                    dispatch('ErrorPopup/createErrorPopup', {title: 'Error while refreshing page', text: response.payload}, {root:true})
                }
            } else {
                dispatch('ErrorPopup/createErrorPopup', {title: 'Error while refreshing page', text: response.payload}, {root:true})
            }
        },

        // Log out
        async logOut({commit}) {
            commit('setUser', {
                _id: 'dummy',
                files: [],
                email: 'dummy',
                password: 'dummy',
                createdAt: 'dummy',
                updatedAt: 'dummy',
                __v: 0

            })
            sessionStorage.clear()
        },

        // Handle file-uploading result
        handleUploadResult({commit}, {num}) {
            commit('setIsUploadedSuccessfully', num)
        },

        // Upload file
        async uploadFile({commit, dispatch}, {picture}) {
            commit('setProcessInProgress', true)
            const data = {
                picture,
                userId: sessionStorage.getItem('_id')
            }
            const response = await uploadPic(data)
            if (response) {
                if (response.statusCode === 200) {
                    commit('setIsUploadedSuccessfully', 2)
                    dispatch('refreshProfile')
                } else {
                    commit('setIsUploadedSuccessfully', 3)
                    dispatch('ErrorPopup/createErrorPopup', {title: 'Error while uploading file', text: response.payload}, {root:true})
                }
            } else {
                dispatch('ErrorPopup/createErrorPopup', {title: 'Error while uploading file',
                    text: 'An error blocked you from reaching the app - please check back later.'}, {root:true})
                commit('setIsUploadedSuccessfully', 3)
            }
            commit('setProcessInProgress', false)
        },

        // Delete file
        async deletePicture({commit, dispatch}, picId,) {
            commit('setProcessInProgress', true)
            const response = await deletePic({picId, userId: sessionStorage.getItem('_id')})
            if (response) {
                if (response.statusCode === 200) {
                    dispatch('refreshProfile')
                }
                if (response.statusCode !== 200) {
                    dispatch('ErrorPopup/createErrorPopup', {title: 'Error while deleting file', text: response.payload}, {root:true})
                }
            } else {
                dispatch('ErrorPopup/createErrorPopup', {title: 'Error while deleting file', text: response.payload}, {root:true})
            }
            commit('setProcessInProgress', false)
        }
    }
}

export default userStore
