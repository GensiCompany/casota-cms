<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý danh mục" />
                <div class="flex gap-5">
                    <a-button
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.BlogsCategoriesDialog.open()"
                    >
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <CategoriesTable
                :categories="categories"
                :loading="loading"
            />
        </div>

        <BlogsCategoriesDialog id="BlogsCategoriesDialog" ref="BlogsCategoriesDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import CategoriesTable from '@/components/blogs/categories/Table.vue';
    import BlogsCategoriesDialog from '@/components/blogs/categories/Dialog.vue';
    import { TYPE_OPTIONS, TYPE } from '@/constants/categories/type';

    export default {
        components: {
            BlogsCategoriesDialog,
            CategoriesTable,
        },

        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                TYPE,
                TYPE_OPTIONS,
                loading: false,
            };
        },

        computed: {
            ...mapState('categories', ['categories']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Quản lý danh mục',
                link: '/categories',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('categories/fetchAll', { type: TYPE.BLOG });
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý danh mục',
            };
        },
    };
</script>
