<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách Phản hồi" />
            </div>
            <FeedbackTable
                class="mt-4"
                :feedbacks="feedbacks"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import FeedbackTable from '@/components/ratings/Table.vue';

    export default {
        components: {
            FeedbackTable,
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
            ...mapState('feedbacks', ['feedbacks', 'pagination']),
        },
        watch: {
            '$route.query': {
                handler() {
                    this.fetchData();
                },
            },
        },
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Phản hồi',
                link: '/ratings',
            }]);
        },

        methods: {

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('feedbacks/fetchAll', { ...this.$route.query, createdBy: 'customer' });
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Phản hồi khách hàng',
            };
        },
    };
</script>
