<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý đơn hàng" />
                <div class="flex gap-5">
                    <nuxt-link to="/orders/create">
                        <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                            <i class="fas fa-plus mr-2" />
                            Thêm mới
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <OrdersTable
                :orders="orders || []"
                :pagination="pagination || {}"
                :loading="loading"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import OrdersTable from '@/components/orders/Table.vue';

    export default {
        components: {
            OrdersTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                images: [],
            };
        },

        computed: {
            ...mapState('orders', ['orders', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Quản lý đơn hàng',
                link: '/orders',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('orders/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý đơn hàng',
            };
        },
    };
</script>
