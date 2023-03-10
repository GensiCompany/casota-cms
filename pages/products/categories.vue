<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý danh mục" />
                <div class="flex gap-5">
                    <a-button
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.CategoriesDialog.open()"
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

        <CategoriesDialog ref="CategoriesDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import CategoriesTable from '@/components/blogs/categories/Table.vue';
    import CategoriesDialog from '@/components/blogs/categories/Dialog.vue';

    export default {
        components: {
            CategoriesDialog,
            CategoriesTable,
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
            ...mapState('blogs/categories', ['categories']),
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
                    await this.$store.dispatch('blogs/categories/fetchAll');
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
