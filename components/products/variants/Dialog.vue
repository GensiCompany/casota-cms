<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(variant) ? 'Thêm sản phẩm con' : 'Chỉnh sửa sản phẩm con'"
        width="850px"
    >
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-y-5 sm:gap-x-5 justify-center">
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
                                {{ _isEmpty(variant) ? "Tải lên" : "Thay đổi" }}
                            </div>
                        </a-upload>
                    </a-form-model-item>
                </div>
                <div class="col-span-2 grid grid-cols-1 gap-1">
                    <a-form-model-item label="Tên sản phẩm" prop="title">
                        <a-input
                            v-model="form.title"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </a-form-model-item>
                    <a-form-model-item label="Giá tiền" prop="price">
                        <a-input
                            v-model="form.price"
                            placeholder="Nhập giá tiền"
                        />
                    </a-form-model-item>
                    <div class="grid grid-cols-2 gap-5">
                        <div class="flex gap-5">
                            <a-form-model-item label="Màu sắc">
                                <a-input
                                    v-model="colorOption.name"
                                    placeholder="Nhập màu sắc"
                                />
                            </a-form-model-item>
                            <input v-model="colorOption.value" class="my-auto" type="color">
                        </div>
                        <a-form-model-item label="Kích cỡ" prop="option2">
                            <a-select
                                v-model="form.option2"
                                placeholder="Chọn kích cỡ"
                            >
                                <a-select-option v-for="size in SIZE_OPTIONS" :key="size.value" :value="size.value">
                                    {{ size.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
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
                {{ _isEmpty(variant) ? "Tạo mới" : "Cập nhật" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty';
    import _cloneDeep from 'lodash/cloneDeep';
    import {
        convertToFormData,
    } from '@/utils/form';
    import { SIZE, SIZE_OPTIONS } from '@/constants/products/sizes';

    const defaulForm = {
        thumbnail: '',
        title: '',
        price: '',
        option1: '',
        option2: SIZE.M,
    };

    export default {
        props: {
            productSelectedId: {
                type: String,
            },
        },
        data() {
            return {
                SIZE,
                SIZE_OPTIONS,
                visible: false,
                loading: false,
                form: null,
                rules: {
                    title: [{ required: true, message: 'Vui lòng nhập tiêu đề sản phẩm', trigger: 'blur' }],
                    price: [{ required: true, message: 'Vui lòng nhập giá sản phẩm', trigger: 'blur' }],
                    'colorOption.name': [{ required: true, message: 'Vui lòng nhập màu sản phẩm', trigger: 'blur' }],
                    option2: [{ required: true, message: 'Vui lòng chọn kích cỡ sản phẩm', trigger: 'blur' }],
                },
                variant: null,
                thumbnailFile: null,
                colorOption: {
                    name: '',
                    value: '#fffff',
                },
            };
        },

        watch: {
            variant: {
                handler() {
                    this.form = this.variant ? _cloneDeep(this.variant) : _cloneDeep(defaulForm);
                    this.colorOption = {
                        name: this.form.option1.split('-')[0] ? this.form.option1.split('-')[0] : '',
                        value: this.form.option1.split('-')[1] ? this.form.option1.split('-')[1] : '#fffff',
                    };
                    console.log(this.colorOption);
                },
                deep: true,
                immediate: true,
            },
        },

        methods: {
            _isEmpty,
            convertToFormData,

            open(variant) {
                this.variant = variant;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.form = _cloneDeep(defaulForm);
            },

            handlerThumbnail(file) {
                this.thumbnailFile = file;
                this.form.thumbnail = URL.createObjectURL(file);
            },

            async create(form) {
                try {
                    await this.$api.productVariants.create(this.productSelectedId, form);
                } catch (error) {
                    this.$$handleError(error);
                }
            },

            async update(form) {
                try {
                    await this.$api.productVariants.update(this.productSelectedId, form._id, form);
                } catch (error) {
                    this.$$handleError(error);
                }
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
                            if (_isEmpty(this.variant)) {
                                await this.create({ ...this.form, option1: `${`${this.colorOption.name}-${this.colorOption.value}`}` });
                                this.$message.success('Thêm mới sản phẩm thành công');
                            } else {
                                await this.update({ ...this.form, option1: `${`${this.colorOption.name}-${this.colorOption.value}`}` });
                                this.$message.success('Chỉnh sửa sản phẩm thành công');
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
