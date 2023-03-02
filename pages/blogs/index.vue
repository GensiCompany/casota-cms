<template>
    <div>
        <BlogsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý bài viết" />
                <div class="flex gap-5">
                    <nuxt-link to="/blogs/create">
                        <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                            <i class="fas fa-plus mr-2" />
                            Thêm mới
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
            <BlogsTable
                class="mt-4"
                :blogs="blogs"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import BlogsFilter from '@/components/blogs/Filter.vue';
    import BlogsTable from '@/components/blogs/Table.vue';

    export default {
        components: {
            BlogsFilter,
            BlogsTable,
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
            ...mapState('blogs', ['blogs', 'pagination']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách blog',
                link: '/blogs',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('blogs/fetchAll');
                } catch (error) {
                    // this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý bài viết',
            };
        },
    };
</script>
