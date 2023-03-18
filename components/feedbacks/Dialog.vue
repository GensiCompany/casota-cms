<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(feedback) ? 'Tạo phản hồi' : 'Chỉnh sửa phản hồi'"
    >
        <a-form-model
            ref="form"
            :model="form"
        >
            <div class="grid grid-cols-10 gap-y-4 sm:gap-x-4">
                <a-form-model-item label="Hình ảnh" prop="image" class="col-span-3">
                    <div class="flex flex-col items-center mx-auto justify-center w-[100px] h-[100px] border-[2px] border-dashed border-gray-20 overflow-hidden rounded-full">
                        <img
                            v-if="form.avatar"
                            :src="form.avatar"
                            onerror="this.src='/images/default.jpg'"
                            alt=""
                            class="w-[100px] h-[100px] rounded-full object-cover"
                        >
                        <a-empty v-else :description="false" />
                    </div>
                    <a-upload
                        :show-upload-list="false"
                        action=""
                        class="mx-auto block text-center"
                        :transform-file="handlerThumbnail"
                    >
                        <div class="flex gap-x-2 mt-4">
                            <img src="/images/upload.svg" alt="avatar">
                            {{ _isEmpty(feedback) ? "Tải lên" : "Thay đổi" }}
                        </div>
                    </a-upload>
                </a-form-model-item>
                <div class="w-full col-span-7">
                    <a-form-model-item
                        prop="title"
                        label="Tên hiển thị"
                        class="!mb-5"
                    >
                        <a-input
                            v-model="form.fullname"
                            placeholder="Nhập tên hiển thị"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        prop="title"
                        label="Chức danh"
                        class="!mb-5"
                    >
                        <a-input
                            v-model="form.position"
                            placeholder="Nhập chức danh"
                        />
                    </a-form-model-item>
                    <a-form-model-item label="Nội dung phản hồi" prop="content">
                        <a-textarea
                            v-model="form.content"
                            placeholder="Nhập nội dung phản hồi"
                            :auto-size="{ minRows: 5, maxRows: 8 }"
                        />
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="px-2"
                type="primary"
                @click="submit"
            >
                {{ _isEmpty(feedback) ? "Tạo phản hồi" : "Thay đổi" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _omit from 'lodash/omit';
    import _isEmpty from 'lodash/isEmpty';
    import {
        convertToFormData,
    } from '@/utils/form';

    export default {

        data() {
            return {
                visible: false,
                loading: false,
                form: {
                    content: '',
                    avatar: '',
                    fullname: '',
                    position: '',
                    _id: '',
                },
                feedback: null,
                thumbnailFile: null,
            };
        },
        methods: {
            _isEmpty,
            open(feedback) {
                this.feedback = feedback;
                this.previewImage = feedback ? feedback.avatar : '';
                this.form = {
                    content: feedback ? feedback.content : '',
                    avatar: feedback ? feedback.avatar : '',
                    fullname: feedback ? feedback.fullname : '',
                    position: feedback ? feedback.position : '',
                    _id: feedback ? feedback._id : null,
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            handlerThumbnail(file) {
                this.thumbnailFile = file;
                this.form.avatar = URL.createObjectURL(file);
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            if (this.thumbnailFile) {
                                const { data: { fileAttributes } } = await this.$api.uploaders.uploadFiles(convertToFormData({
                                    files: this.thumbnailFile,
                                }));
                                this.form = { ...this.form, avatar: fileAttributes[0]?.source };
                            }
                            if (!this.feedback) {
                                await this.$api.feedbacks.create({ ...this.form, status: 'active' });
                                this.$message.success('Thêm Phản hồi thành công');
                            } else {
                                await this.$api.feedbacks.update(this.form._id, _omit(this.form, ['_id']));
                                this.$message.success('Sửa phản hồi thành công');
                            }
                            this.close();
                            this.$nuxt.refresh();
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
