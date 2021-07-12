<template>
    <div>
        <b-modal
            id="errorPopup"
            header-bg-variant="danger"
            header-text-variant='white'
            :title="getPopupTitle"
            size="md"
            hide-header-close
            no-close-on-backdrop
            no-close-on-esc
        >
            {{ getPopupText }}
            <template v-slot:modal-footer="{ hide }">
                <b-button
                    variant="dark"
                    size="sm"
                    class="float-right"
                    @click='closeModal(); hide()'>
                    Close
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters('ErrorPopup', ['getPopupTitle', 'getPopupText']),
    },
    methods: {
        ...mapActions('ErrorPopup', ['deleteErrorPopup']),
        closeModal() {
            this.deleteErrorPopup()
        }
    }
}
</script>
