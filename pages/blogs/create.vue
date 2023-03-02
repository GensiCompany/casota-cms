<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Tạo bài viết" />
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
                        Xuất bản
                    </a-button>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <BlogsForm
                ref="BlogsForm"
                @submit="submitForm"
            />
        </div>
    </div>
</template>

<script>
    import BlogsForm from '@/components/blogs/Form.vue';

    export default {
        components: {
            BlogsForm,
        },
        // async asyncData({ store }) {
        //     await store.dispatch('posts/categories/fetchAll');
        // },
        data() {
            return {
                loading: false,
            };
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
                label: 'Bài viết',
                link: '/blogs',
            }, {
                label: 'Thêm bài viết',
                link: '/blogs/create',
            }]);
        },

        methods: {
            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.posts.create(payload);
                    this.$message.success('Đăng bài viết thành công');
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
                title: 'Thêm mới bài viết',
            };
        },
    };
</script>
