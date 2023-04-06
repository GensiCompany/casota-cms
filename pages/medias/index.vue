<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý ảnh Instagram" />
                <div class="flex gap-5">
                    <a-button
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.MediasDialog.open()"
                    >
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <MediasTable
                :medias="medias"
                :loading="loading"
            />
            <MediasDialog ref="MediasDialog" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import MediasTable from '@/components/medias/Table.vue';
    import MediasDialog from '@/components/medias/Dialog.vue';

    export default {
        components: {
            MediasTable,
            MediasDialog,
        },

        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('medias', ['medias']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách ảnh Instagram',
                link: '/medias',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('medias/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách ảnh Instagram',
            };
        },
    };
</script>
