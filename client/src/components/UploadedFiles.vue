<template>
    <div>
        <b-card
            bg-variant="light"
        >
            <b-card-header>
                <b>Your Uploaded Files</b>
            </b-card-header>
            <b-card-body>
                <b-overlay
                    :show="this.getProcessInProgress"
                    spinner-variant="primary"
                    spinner-type="grow"
                    spinner-medium
                    rounded="sm"
                >
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="items.length"
                        :per-page="perPage"
                        aria-controls="uploaded-files-table"
                    ></b-pagination>

                    <b-table
                        id="uploaded-files-table"
                        striped hover
                        show-empty
                        :items="getUserProfile.files"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :fields="fields"
                        head-variant="dark"
                        bordered
                        empty-text="You haven't uploaded anything yet."
                    >
                        <!--                Functions column buttons-->
                        <template v-slot:cell(actions)="data">
                            <b-button-group>
                                <form method="post" target="_blank" :action="downloadUri">
                                    <b-button
                                        size="sm"
                                        variant="primary"
                                        type="submit"
                                        style="margin-right: 12px"
                                        v-b-popover.hover.left="'Download picture'"
                                        @click="tableFunctions('download', data)"
                                    >
                                        <b-icon icon="download"/>
                                    </b-button>
                                </form>
                                <b-button
                                    size="sm"
                                    variant="danger"
                                    @click="tableFunctions('delete', data)"
                                    v-b-popover.hover.right="'Delete picture'"
                                >
                                    <b-icon icon="trash"/>
                                </b-button>
                            </b-button-group>
                        </template>

                        <!--                Converting bytes to kilobytes / megabytes-->
                        <template v-slot:cell(data.size)="data">
                            <div v-if="data.item.data.size > 1000000">
                                {{ Math.round(data.item.data.size / 100000) / 10 }} MB
                            </div>
                            <div v-else>
                                {{ Math.round(data.item.data.size / 100) / 10 }} KB
                            </div>
                        </template>

                        <!--                Converting ISODate to a more readable format-->
                        <template v-slot:cell(data.uploadedAt)="data">
                            {{ data.item.data.uploadedAt.substring(0, 10) }}
                        </template>
                    </b-table>
                </b-overlay>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    data() {
        return {
            overlayShow: false,
            empty: [],
            items: [],
            currentPage: 1,
            perPage: 10,
            fields: [
                { key: "data.name", label: "Filename", tdClass: 'table-uploaded-left', thClass: 'table-uploaded-left', sortable: true },
                { key: "data.size", label: "Size", tdClass: 'text-center', thClass: 'text-center', sortable: true },
                { key: "data.uploadedAt", label: "Uploaded At", tdClass: 'text-center', thClass: 'text-center', sortable: true },
                { key: 'actions', label: "", tdClass: 'table-uploaded-actions', thClass: 'text-center' }
            ],
            downloadUri: null
        }
    },
    computed: {
        ...mapGetters('User', ['getUserProfile', 'getDomainUsed', 'getProcessInProgress']),

    },
    methods: {
        ...mapActions('User', ['deletePicture']),
        tableFunctions(type, data) {
            if (type === 'download') {
                return this.downloadUri =
                    `${this.getDomainUsed}/file/download/?picId=${data.item._id}&userId=${sessionStorage.getItem('_id')}`
            }
            this.deletePicture(data.item._id)
        }
    }
}
</script>

<style>
.table-uploaded-left {
    text-align: start;
}

.table-uploaded-actions {
    width: 100px;
    text-align: center;
}

</style>
