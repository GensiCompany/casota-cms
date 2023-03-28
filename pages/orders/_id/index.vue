<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back text="Chi tiết đơn hàng" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/orders">
                        <a-button type="default">
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <nuxt-link v-if="order.status === STATUS.DRAFT" :to="`/orders/${order._id}/edit`">
                        <a-button
                            type="primary"
                            :loading="loading"
                        >
                            Chỉnh sửa
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <OrdersForm
                ref="OrdersForm"
                :order="order"
                :is-edit="true"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import OrdersForm from '@/components/orders/Form.vue';
    import { STATUS } from '@/constants/orders/status';

    export default {
        components: {
            OrdersForm,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ store }) {
            await store.dispatch('products/fetchAllVariant');
        },

        data() {
            return {
                STATUS,
                loading: false,
            };
        },

        computed: {
            ...mapState('orders', ['order']),
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Đơn hàng',
                link: '/products',
            }, {
                label: 'Chi tiết đơn hàng',
                link: `/products/${this.order._id}`,
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('orders/fetchDetail', this.$route.params.id);
                } catch (e) {
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Chi tiết đơn hàng',
            };
        },
    };
</script>
