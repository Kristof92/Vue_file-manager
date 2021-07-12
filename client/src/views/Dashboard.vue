<template>
    <div>
        <h1 style="text-align: center; margin-bottom: 4rem">Dashboard</h1>
        <ErrorPopup/>
        <b-overlay
            :show="overlaySwitch"
            spinner-variant="primary"
            spinner-type="grow"
            spinner-medium
            rounded="sm"
        >
            <b-container fluid="true">
                <b-row>
                    <b-col style="text-align: center" cols="8">
                        <UploadedFiles/>
                    </b-col>
                    <b-col style="text-align: center" cols="4">
                        <Profile/>
                        <br>
                        <FileUploader/>
                    </b-col>
                </b-row>
            </b-container>
        </b-overlay>
    </div>
</template>

<script>
import Profile from "@/components/Profile";
import FileUploader from "@/components/FileUploader";
import UploadedFiles from "@/components/UploadedFiles";
import ErrorPopup from "@/components/ErrorPopup";
import {mapGetters} from "vuex";

export default {
    components: {
        Profile,
        FileUploader,
        UploadedFiles,
        ErrorPopup
    },
    computed: {
        ...mapGetters('ErrorPopup', ['getPopupTitle']),
        ...mapGetters('User', ['getUserProfile']),
        overlaySwitch() {
            return this.getUserProfile.email === '';
        }
    },
    watch: {
        getPopupTitle() {
            if (this.getPopupTitle) {
                this.$bvModal.show('errorPopup')
            }
        }
    }
}
</script>
