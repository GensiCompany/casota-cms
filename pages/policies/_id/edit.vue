<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header :text="policy.title || ''" />
                <div class="flex gap-5">
                    <nuxt-link to="/policies">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button
                        :loading="loading"
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="$refs.PolicyForm.submit()"
                    >
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <PolicyForm ref="PolicyForm" :policy="policy" @submit="update" />
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
                    link: `/policies/${this.policy._id}/edit`,
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

            async update(form) {
                try {
                    this.loading = true;
                    await this.$api.policies.update(this.$route.params.id, form);
                    this.$message.success('Chỉnh sửa chính sách thành công');
                    this.$nuxt.refresh();
                    this.$router.push('/policies');
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
