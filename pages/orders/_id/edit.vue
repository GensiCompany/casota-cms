<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back text="Chỉnh sửa đơn hàng" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/orders">
                        <a-button type="default">
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="$refs.OrdersForm.submit()"
                    >
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <OrdersForm
                ref="OrdersForm"
                :order="order"
                @submit="submitForm"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import OrdersForm from '@/components/orders/Form.vue';

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
                label: 'Chỉnh sửa đơn hàng',
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

            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.orders.update(this.$route._id, payload);
                    this.$message.success('Chỉnh sửa đơn hàng thành công');
                    this.$router.push('/orders');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Chỉnh sửa đơn hàng',
            };
        },
    };
</script>
