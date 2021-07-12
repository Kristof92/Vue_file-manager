<template>
    <div>
        <b-card
            bg-variant="light"
        >
            <b-card-header>
                <b>Your Profile</b>
            </b-card-header>
            <b-card-body>
                <b-container fluid="true">
                    <b-row>
                        <b-col style="text-align: start" cols="4">
                            <p>Username</p>
                        </b-col>
                        <b-col>
                            <b>{{ getUserProfile.email }}</b>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-alert :show="maxFileCountReachedAlertShow" variant="danger">{{ maxFileCountReachedAlertText }}</b-alert>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col style="text-align: start" cols="4">
                            <p>Uploaded files</p>
                        </b-col>
                        <b-col>
                            <b>{{ getUserProfile.files.length }} / {{ getMaxFileCount }}</b>
                            <br>
                            <b-progress :value="getUserProfile.files.length" :max="getMaxFileCount" animated :variant="progressVariant"></b-progress>
                            <br>
                        </b-col>
                    </b-row>
                    <b-row style="margin-top: 0.5rem">
                        <b-col style="text-align: start" cols="4">
                            <p>Total uploaded data</p>
                        </b-col>
                        <b-col>
                            <div v-if="this.getTotalUploadedData > 1000000">
                                <b>{{ Math.round(getTotalUploadedData / 100000) / 10 }} MB</b>
                            </div>
                            <div v-else>
                                <b>{{ Math.round(getTotalUploadedData / 100) / 10 }} KB</b>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col style="text-align: start" cols="4">
                            <p>Last uploaded:</p>
                        </b-col>
                        <b-col>
                            <b>{{ getUserProfile.updatedAt.substring(0, 10) }}</b>
                        </b-col>
                    </b-row>
                    <b-row style="margin-top: 0.5rem">
                        <b-col>
                            <router-link to="/">
                                <b-button
                                    size="sm"
                                    variant="warning"
                                    block
                                    @click="logOutUser"
                                >
                                    <b-icon icon="box-arrow-left" style="margin-right: 4px"/>
                                    Log Out
                                </b-button>
                            </router-link>
                        </b-col>
                    </b-row>
                </b-container>
            </b-card-body>
        </b-card>
    </div>
</template>
<script>

import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
            maxFileCountReachedAlertText: ''
        }
    },
    computed: {
        ...mapGetters('User', ['getUserProfile', 'getMaxFileCount', 'getTotalUploadedData']),
        progressVariant() {
            if (this.getUserProfile.files.length < this.getMaxFileCount) {
                return "primary"
            }
            return 'danger'
        },
        maxFileCountReachedAlertShow() {
            return this.getUserProfile.files.length === this.getMaxFileCount
        }

    },
    methods: {
        ...mapActions('User', ['logOut']),
        logOutUser() {
            this.logOut()
        }
    },
    created() {
        this.maxFileCountReachedAlertText = `You have reached your limit (${this.getMaxFileCount} files).`
    }
}
</script>
