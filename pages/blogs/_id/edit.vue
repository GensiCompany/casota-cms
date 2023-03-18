<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header :text="blog.title || ''" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/blogs">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="$refs.BlogsForm.submit()"
                    >
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <BlogsForm ref="BlogsForm" :blog="blog" @submit="submitForm" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import BlogsForm from '@/components/blogs/Form.vue';

    export default {
        components: {
            BlogsForm,
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
            ...mapState('blogs', ['blog']),
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Bài viết',
                link: '/blogs',
            }, {
                label: 'Chỉnh sửa bài viết',
                link: `/blogs/${this.blog._id}`,
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('blogs/fetchDetail', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.blogs.update(this.$route.params.id, payload);
                    this.$message.success('Chỉnh sửa bài viết thành công');
                    this.$router.push('/blogs');
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
                title: 'Chỉnh sửa bài viết',
            };
        },
    };
</script>
