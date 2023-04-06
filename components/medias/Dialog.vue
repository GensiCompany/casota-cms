<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(media) ? 'Thêm ảnh Instagram' : 'Chỉnh sửa ảnh Instagram'"
    >
        <a-form-model
            ref="form"
            :model="form"
            layout="vertical"
            :colon="false"
        >
            <div class="grid grid-cols-1 gap-y-5 sm:gap-x-5">
                <div>
                    <div class="flex flex-col items-center w-[200px] h-[200px] border-[2px] border-dashed border-gray-20 overflow-hidden rounded-full mx-auto">
                        <img
                            v-if="form.source"
                            :src="form.source"
                            onerror="this.src='/images/default.jpg'"
                            alt=""
                            class="w-[200px] h-[200px] rounded-full mx-auto object-cover"
                        >
                        <a-empty v-else class="pt-10" :description="false" />
                    </div>
                    <a-upload
                        :show-upload-list="false"
                        action=""
                        class="mx-auto block text-center"
                        :transform-file="handlerThumbnail"
                    >
                        <div class="flex gap-x-2 mt-4">
                            <img src="/images/upload.svg" alt="avatar">
                            {{ _isEmpty(media) ? "Tải lên" : "Thay đổi" }}
                        </div>
                    </a-upload>
                    <a-form-model-item label="Tiêu đề" prop="title">
                        <a-input v-model="form.title" placeholder="Nhập tiêu đề" />
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
                {{ _isEmpty(media) ? "Thêm mới" : "Cập nhật" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _omit from 'lodash/omit';
    import _isEmpty from 'lodash/isEmpty';
    import {
        convertToFormData,
    } from '@/utils/form';

    const defaultForm = {
        title: '',
        source: '',
    };

    export default {

        data() {
            return {
                visible: false,
                loading: false,
                form: this.media ? _cloneDeep(this.media) : _cloneDeep(defaultForm),
                media: null,
                thumbnailFile: null,
            };
        },

        watch: {
            media() {
                this.form = this.media ? _cloneDeep(this.media) : _cloneDeep(defaultForm);
            },
        },

        methods: {
            _isEmpty,
            open(media) {
                this.media = media;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            handlerThumbnail(file) {
                this.thumbnailFile = file;
                this.form.source = URL.createObjectURL(file);
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
                                this.form = { ...this.form, source: fileAttributes[0]?.source };
                            }
                            if (!this.form._id) {
                                await this.$api.medias.create({ ...this.form });
                                this.$message.success('Thêm ảnh thành công');
                            } else {
                                await this.$api.medias.update(this.form._id, _omit(this.form, ['_id']));
                                this.$message.success('Chỉnh sửa ảnh thành công');
                            }
                            this.$nuxt.refresh();
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
