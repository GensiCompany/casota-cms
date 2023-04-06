<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header :text="policy.title || ''" />
                <div class="flex gap-5">
                    <nuxt-link to="/policies">
                        <a-button>
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <nuxt-link :to="`/policies/${policy._id}/edit`">
                        <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                            Chỉnh sửa
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <PolicyForm ref="PolicyForm" :policy="policy" :is-edit="true" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import PolicyForm from '@/components/policies/Form.vue';

    export default {
        components: {
            PolicyForm,
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
            ...mapState('policies', ['policy']),
            breadcrumbs() {
                return [{
                    label: 'Danh sách chính sách',
                    link: '/policies',
                }, {
                    label: this.policy.title || '',
                    link: `/policies/${this.policy._id}`,
                }];
            },
        },

        watch: {
            breadcrumbs() {
                this.$store.commit('breadcrumbs/SET_BREADCRUMBS', this.breadcrumbs);
            },
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('policies/fetchDetail', this.$route.params.id);
                    await this.$store.dispatch('policies/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: `${this.policy.title}` || '',
            };
        },
    };
</script>
