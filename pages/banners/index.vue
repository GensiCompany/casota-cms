<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý Banners" />
                <div class="flex gap-5">
                    <a-button
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.BannerDialog.open()"
                    >
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <BannerTable
                :banners="banners"
                :loading="loading"
                :pagination="pagination"
            />
            <BannerDialog ref="BannerDialog" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import BannerTable from '@/components/banners/Table.vue';
    import BannerDialog from '@/components/banners/Dialog.vue';

    export default {
        components: {
            BannerTable,
            BannerDialog,
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
            ...mapState('banners', ['banners', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách Banners',
                link: '/banners',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('banners/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý Banners',
            };
        },
    };
</script>
