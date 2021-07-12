<template>
    <div>
        <b-card
            bg-variant="light"
        >
            <b-card-header>
                <b>File Uploader</b>
                <b-icon style="margin-left: 4px" icon="info-circle" v-b-popover.hover.top="'Only image files are supported currently.'"/>
            </b-card-header>
            <b-card-body>
                <b-overlay
                    :show="this.getProcessInProgress"
                    spinner-variant="primary"
                    spinner-type="grow"
                    spinner-medium
                    rounded="sm"
                >
                    <b-alert fade :show="alertLabelShow" :variant="alertVariant">{{ uploadResponse }}</b-alert>
                    <b-form-file
                        v-model="picture"
                        placeholder="Choose a file or drop it here..."
                        accept="image/*"
                    />
                    <b-container>
                        <b-row style="margin-top: 2rem">
                            <b-col>
                                <b-button :disabled="deleteBtnDisabler" @click="deleteUploaded()" variant="danger" size="sm" block>
                                    <b-icon icon="trash" style="margin-right: 4px"/>
                                    Delete
                                </b-button>
                            </b-col>
                            <b-col>
                                <b-button :disabled="uploadBtnDisabler" @click="uploadAFile()" variant="success" size="sm" block>
                                    <b-icon icon="upload" style="margin-right: 4px"/>
                                    Upload File
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-overlay>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            picture: null,
            response: null,
            uploadResponse: '',
            alertLabelShow: false
        }
    },
    computed: {
        ...mapMutations('User', ['setIsUploadedSuccessfully']),
        ...mapGetters('User', ['getUserProfile', 'getMaxFileCount', 'getIsUploadedSuccessfully', 'getProcessInProgress']),
        alertVariant() {
            if (this.uploadResponse === 'Picture successfully uploaded.') return 'success'
            return 'danger'
        },
        uploadBtnDisabler() {
            if (this.getUserProfile.files.length === this.getMaxFileCount) {
                return true
            } else {
                return this.picture === null
            }
        },
        deleteBtnDisabler() {
            return this.picture === null
        }
    },
    methods: {
        ...mapActions('User', ['uploadFile', 'handleUploadResult']),
        deleteUploaded() {
            this.picture = null
        },
        uploadAFile() {
            this.uploadFile({picture: this.picture})
        },
        AlertTimer() {
            // Arrow function is needed here to get the right 'this' binding
            setTimeout(() => this.alertLabelShow = false, 3000)
        }
    },
    watch: {
        getIsUploadedSuccessfully() {
            if (this.getIsUploadedSuccessfully !== 1) {
                if (this.getIsUploadedSuccessfully === 2) {
                    this.uploadResponse = 'Picture successfully uploaded.'
                    this.alertLabelShow = true
                }
                this.handleUploadResult({num: 1})
                this.picture = null
            }
        },
        alertLabelShow() {
            if (this.alertLabelShow) {
                this.AlertTimer()
            }
        }
    }
}
</script>
