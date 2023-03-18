<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(banner) ? 'Tạo Banner' : 'Chỉnh sửa Banner'"
        width="800px"
    >
        <a-form-model
            ref="form"
            :model="form"
            layout="vertical"
            :colon="false"
        >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-x-5">
                <div>
                    <a-form-model-item label="Hình ảnh" prop="image">
                        <div class="flex flex-col items-center w-full h-[200px] border-[2px] border-dashed border-gray-20 overflow-hidden rounded-md">
                            <img
                                v-if="form.thumbnail"
                                :src="form.thumbnail"
                                onerror="this.src='/images/default.jpg'"
                                alt=""
                                class="w-full h-[200px] rounded-md object-cover"
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
                                {{ _isEmpty(banner) ? "Tải lên" : "Thay đổi" }}
                            </div>
                        </a-upload>
                    </a-form-model-item>
                </div>
                <div>
                    <a-form-model-item label="Tiêu đề" prop="title">
                        <a-input v-model="form.title" placeholder="Nhập tiêu đề" />
                    </a-form-model-item>
                    <a-form-model-item label="Đường dẫn" prop="link">
                        <a-input v-model="form.link" placeholder="Nhập đường dẫn" />
                    </a-form-model-item>
                    <a-form-model-item label="Mô tả" prop="desciption">
                        <a-textarea
                            v-model="form.description"
                            placeholder="Nhập mô tả"
                            :auto-size="{ minRows: 4, maxRows: 5 }"
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
                {{ _isEmpty(banner) ? "Tạo banner" : "Thay đổi" }}
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
                    title: '',
                    link: '',
                    thumbnail: '',
                    desciption: '',
                    _id: '',
                },
                banner: null,
                thumbnailFile: null,
            };
        },
        methods: {
            _isEmpty,
            open(banner) {
                this.banner = banner;
                this.form = {
                    title: banner ? banner.title : '',
                    description: banner ? banner.description : '',
                    link: banner ? banner.link : '',
                    thumbnail: banner ? banner.thumbnail : '',
                    _id: banner ? banner._id : null,
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            handlerThumbnail(file) {
                this.thumbnailFile = file;
                this.form.thumbnail = URL.createObjectURL(file);
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
                                this.form = { ...this.form, thumbnail: fileAttributes[0]?.source };
                            }
                            if (!this.form._id) {
                                await this.$api.banners.create({ ...this.form, status: 'active' });
                                this.$message.success('Thêm Banner thành công');
                            } else {
                                await this.$api.banners.update(this.form._id, _omit(this.form, ['_id']));
                                this.$message.success('Sửa Banner thành công');
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
