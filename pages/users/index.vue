<template>
    <div>
        <div class="card mt-4">
            <UsersFilters />
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quản lý khách hàng" />
                <div class="flex gap-5">
                    <nuxt-link to="/users/create">
                        <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                            <i class="fas fa-pen mr-2" />
                            Thêm mới
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
            <div class="mt-4">
                <UsersTable :users="users" :loading="loading" :pagination="pagination" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import UsersTable from '@/components/users/Table.vue';
    import UsersFilters from '@/components/users/Filters.vue';

    export default {
        components: {
            UsersTable,
            UsersFilters,
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
            ...mapState('users', ['users', 'pagination']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
                deep: true,
                immediate: true,
            },
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách người dùng',
                link: '/users',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('users/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Quản lý người đùng',
            };
        },
    };
</script>
