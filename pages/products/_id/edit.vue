<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`Sản phẩm: ${product.title || ''}`" />
                <div class="flex gap-x-5">
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="$refs.ProductsForm.submit()"
                    >
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <ProductsForm
                ref="ProductsForm"
                :product="product"
                :is-edit="false"
                @submit="updateProduct"
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
                label: 'Chỉnh sửa sản phẩm',
                link: `/products/${this.product._id}/edit`,
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

            async updateProduct(payload) {
                try {
                    this.loading = true;
                    await this.$api.products.update(this.$route.params.id, payload);
                    this.$message.success('Cập nhật sản phẩm thành công');
                    this.$router.push('/products');
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
                title: 'Chỉnh sửa sản phẩm',
            };
        },
    };
</script>
