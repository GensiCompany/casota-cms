<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`Sản phẩm: ${product.title || ''}`" />
                <div class="flex gap-x-5">
                    <nuxt-link :to="`/products/${product._id}/edit`">
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
            <ProductsForm
                ref="ProductsForm"
                :product="product"
                :is-edit="true"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProductsForm from '@/components/products/Form.vue';

    export default {
        components: {
            ProductsForm,
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
            ...mapState('products', ['product']),
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Sản phẩm',
                link: '/products',
            }, {
                label: 'Chi tiết sản phẩm',
                link: `/products/${this.product._id}`,
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('products/fetchDetail', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Chi tiết sản phẩm',
            };
        },
    };
</script>
