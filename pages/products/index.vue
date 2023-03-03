<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý sản phẩm" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';

    export default {
        components: {
        },

        async fetch() {
            // await this.fetchData();
        },
        data() {
            return {
                loading: false,
                images: [],
            };
        },

        computed: {
            // ...mapState('images', ['images', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách sản phẩm',
                link: '/products',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    // await this.$store.dispatch('images/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý sản phẩm',
            };
        },
    };
</script>
