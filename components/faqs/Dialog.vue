<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(feedback) ? 'Thêm mới câu hỏi' : 'Chỉnh sửa câu hỏi'"
    >
        <a-form-model
            ref="form"
            :model="form"
            layout="vertical"
            :colon="false"
        >
            <div>
                <div>
                    <a-form-model-item
                        prop="title"
                        label="Tiêu đề bài viết"
                    >
                        <a-input
                            v-model="form.title"
                            placeholder="Nhập tiêu đề bài viết"
                        />
                    </a-form-model-item>
                </div>
                <Editor :content-props="form.content" @getContent="getContent" />
            </div>
        </a-form-model>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="submit"
            >
                {{ _isEmpty(feedback) ? "Thêm mới" : "Cập nhật" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty';
    import Editor from '@/components/shared/Editor.vue';

    export default {
        components: {
            Editor,
        },
        props: {
        },
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                visible: false,
                loading: false,
                room: null,
                form: {
                    content: '',
                    thumbnail: '',
                },
                fileName: null,
                feedback: null,
            };
        },
        methods: {
            _isEmpty,
            open(feedback) {
                this.feedback = feedback;
                this.form = {
                    description: feedback ? feedback.description : '',
                    thumbnail: feedback ? feedback.thumbnail : '',
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            getContent(content) {
                this.form.content = content;
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.handlerThumbnail();
                            await this.$api.feedbacks.create({ ...this.form, status: 'active' });
                            this.$message.success('Thêm Phản hồi thành công');
                            this.close();
                            await this.$store.dispatch('feedbacks/fetchAll', { ...this.$route.query, createdBy: 'admin' });
                        } catch (error) {
                            this.$handleError(error);
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },
        },
    };
</script>
