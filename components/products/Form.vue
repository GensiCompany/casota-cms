<template>
    <div :class="`w-full 'bg-white' : 'bg-[#18191a]' px-3 xl:px-0 overflow-auto pb-4`">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-10 gap-4">
                <div class="col-span-12 xl:col-span-7 p-3 rounded-md bg-white">
                    <p>1. Thông tin cơ bản</p>
                    <a-form-model-item prop="title" label="Tên sản phẩm">
                        <a-input
                            v-model="form.title"
                            placeholder="Nhập tên sản phẩm"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        has-feedback
                        class="!mt-5"
                        label="Mô tả ngắn của sản phẩm"
                        prop="shortDescription"
                    >
                        <a-textarea
                            v-model="form.shortDescription"
                            placeholder="Mô tả ngắn cho sản phẩm"
                            :auto-size="{ minRows: 2, maxRows: 3 }"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <Editor
                        :content-props="form.content"
                        label="Mô tả sản phẩm"
                        :is-edit="isEdit"
                        @getContent="getContent"
                    />
                </div>
                <div :class="`col-span-12 xl:col-span-3`">
                    <div class="bg-white p-3 mb-3 rounded-md">
                        <p>
                            2. Hình ảnh đại diện
                        </p>
                        <div class="flex flex-col items-center gap-y-8 mb-6 w-full">
                            <div class="flex flex-col items-center w-full h-[200px] border-[2px] border-dashed border-gray-20 overflow-hidden rounded-md">
                                <img
                                    v-if="form.thumbnail"
                                    :src="form.thumbnail"
                                    onerror="this.src='/images/default.jpg'"
                                    alt="/"
                                    class="w-full h-[200px] rounded-md object-cover"
                                >
                                <a-empty v-else class="pt-10" :description="false" />
                            </div>
                            <a-upload
                                v-if="!isEdit"
                                :show-upload-list="false"
                                action=""
                                class="mx-auto block text-center"
                                :transform-file="handlerThumbnail"
                            >
                                <div class="flex gap-x-2">
                                    <img src="/images/upload.svg" alt="avatar">
                                    {{ _isEmpty(product) ? "Tải lên" : "Thay đổi" }}
                                </div>
                            </a-upload>
                        </div>
                        <p class="text-black">
                            3. Danh mục sản phẩm
                        </p>
                        <div class="flex flex-col items-center gap-y-8 mb-6 w-full">
                            <a-select
                                v-model="form.newCategoryId"
                                placeholder="Danh mục"
                                class="w-full"
                                :disabled="isEdit"
                                @change="selectCategory"
                            />
                        </div>
                        <div v-if="product">
                            <span class="block mb-3">Trạng thái hoạt động: <span class="font-semibold">{{ STATUS_LABEL }}</span></span>
                            <a-switch
                                :checked="isActive"
                                :disabled="isEdit"
                                @change="changeStatus"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </a-form-model>
    </div>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty';
    import { mapState } from 'vuex';
    import _cloneDeep from 'lodash/cloneDeep';
    import Editor from '@/components/shared/Editor.vue';
    import { convertToFormData } from '@/utils/form';
    import { STATUS } from '@/constants/products/status';

    const form = {
        title: '',
        shortDescription: '',
        content: '',
        categoryId: '',
        thumbnail: '',
    };

    export default {
        components: {
            Editor,
        },

        props: {
            product: {
                type: Object,
                default: () => {},
            },
            isEdit: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                form: this.product ? _cloneDeep(this.product) : _cloneDeep(form),
                rules: {
                    title: [{ required: true, message: 'Vui lòng nhập tên sản phẩm', trigger: 'blur' }],
                    content: [{ required: true, message: 'Vui lòng nhập mô tả sản phẩm', trigger: 'blur' }],
                },
                fileThumbnail: null,
            };
        },

        computed: {
            ...mapState('products/categories', ['categories']),
            isActive() {
                return this.form.status === STATUS.ACTIVE;
            },
            STATUS_LABEL() {
                return this.form.status === STATUS.ACTIVE ? 'Hoạt động' : 'Không hoạt động';
            },
        },

        watch: {
            product() {
                this.form = this.product ? _cloneDeep(this.product) : _cloneDeep(form);
            },
        },

        methods: {
            _isEmpty,
            convertToFormData,

            handlerThumbnail(file) {
                this.fileThumbnail = file;
                this.form.thumbnail = URL.createObjectURL(file);
            },

            selectCategory(category) {
                this.form.newCategoryId = category;
            },

            getContent(content) {
                this.form.content = content;
            },

            async changeStatus() {
                this.form.status = this.form.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        if (this.fileThumbnail) {
                            const { data: { fileAttributes } } = await this.$api.uploaders.uploadFiles(convertToFormData({
                                files: this.fileThumbnail,
                            }));
                            this.form = { ...this.form, thumbnail: fileAttributes[0]?.source };
                        }
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>

<style lang="scss">
    .ant-upload-list-picture-card {
        .ant-upload-list-item-actions {
            a:nth-child(1) {
                @apply hidden
            }
        }
    }
</style>
