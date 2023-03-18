<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(faq) ? 'Thêm mới câu hỏi' : 'Chỉnh sửa câu hỏi'"
    >
        <a-form-model
            ref="form"
            :model="form"
        >
            <div>
                <div>
                    <a-form-model-item prop="title" label="Tiêu đề câu hỏi">
                        <a-input v-model="form.title" placeholder="Nhập tiêu đề câu hỏi" />
                    </a-form-model-item>
                </div>
                <Editor
                    label="Nội dung câu trả lời"
                    :content-props="form.content"
                    @getContent="getContent"
                />
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
                {{ _isEmpty(faq) ? "Thêm mới" : "Cập nhật" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _isEmpty from 'lodash/isEmpty';
    import Editor from '@/components/shared/Editor.vue';

    const defaultForm = {
        title: '',
        content: '',
    };

    export default {
        components: {
            Editor,
        },

        props: {
        },

        data() {
            return {
                visible: false,
                loading: false,
                faq: null,
                form: this.faq ? _cloneDeep(this.faq) : _cloneDeep(defaultForm),
            };
        },

        watch: {
            faq: {
                handler() {
                    this.form = this.faq ? _cloneDeep(this.faq) : _cloneDeep(defaultForm);
                },
            },
            deep: true,
            immediate: true,
        },

        methods: {
            _isEmpty,
            open(faq) {
                this.faq = faq;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.faq = _cloneDeep(defaultForm);
            },

            getContent(content) {
                this.form.content = content;
            },

            async create(form) {
                try {
                    await this.$api.faqs.create(form);
                    this.$message.success('Thêm mới câu hỏi thành công');
                } catch (error) {
                    this.$handleError(error);
                }
            },

            async update(form) {
                try {
                    await this.$api.faqs.update(form._id, form);
                    this.$message.success('Cập nhật câu hỏi thành công');
                } catch (error) {
                    this.$handleError(error);
                }
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            if (_isEmpty(this.faq)) {
                                await this.create(this.form);
                            } else {
                                await this.update(this.form);
                            }
                            this.$nuxt.refresh();
                            this.empty();
                            this.close();
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
