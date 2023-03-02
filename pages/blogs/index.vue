<template>
    <div>
        <PostsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý bài viết" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
                    </a-button>
                </div>
            </div>
            <PostsTable
                class="mt-4"
                :posts="posts"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    // import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import PostsFilter from '@/components/blogs/Filter.vue';
    import PostsTable from '@/components/blogs/Table.vue';
    // import GiftEvent from '@/components/settings/gift/Table.vue';
    // import DisplayEvent from '@/components/settings/tables/Display.vue';
    // import TypeWheelEvent from '@/components/settings/tables/TypeWheel.vue';

    export default {
        components: {
            PostsFilter,
            PostsTable,
            // GiftEvent,
            // DisplayEvent,
            // TypeWheelEvent,
        },

        async fetch() {
            // await this.fetchData();
        },
        data() {
            return {
                loading: false,
                posts: [],
                pagination: {},
            };
        },

        computed: {
            // ...mapState('images', ['images', 'pagination']),
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
                title: 'Quản lý bài viết',
            };
        },
    };
</script>
