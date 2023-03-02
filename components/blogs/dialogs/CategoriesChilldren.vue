<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="isEdit ? 'Chỉnh sửa danh mục con' : 'Thêm mới danh mục con'"
    >
        <div>
            <a-form-model
                ref="Form"
                :model="form"
                :rules="rules"
            >
                <div class="flex gap-3">
                    <a-form-model-item label="Tên danh mục" prop="name" class="flex-1">
                        <a-input v-if="language === 'vi'" v-model="form.name" placeholder="Tên danh mục" />
                        <a-input v-if="language === 'en'" v-model="form.nameEn" placeholder="Tên danh mục" />
                    </a-form-model-item>
                    <a-form-model-item label="Ngôn ngữ">
                        <a-select v-model="language" placeholder="Ngôn ngữ" class="!w-[150px]">
                            <a-select-option value="vi">
                                Tiếng Việt
                            </a-select-option>
                            <a-select-option value="en">
                                Tiếng Anh
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </div>
            </a-form-model>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="handleConfirm"
            >
                {{ category ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _isEmpty from 'lodash/isEmpty';

    const defaultForm = {
        id: null,
        parentId: null,
        name: null,
        nameEn: null,
    };

    export default {
        data() {
            return {
                visible: false,
                loading: false,
                category: null,
                categoryParentId: null,
                language: 'vi',
                form: this.category ? _cloneDeep(this.category) : defaultForm,
                rules: {
                    name: [{ required: true, message: 'Không được để trống trường này', trigger: 'change' }],
                },
            };
        },

        computed: {
            isEdit() {
                return !_isEmpty(this.form.children);
            },
        },

        watch: {
            category() {
                this.form = this.category ? _cloneDeep(this.category) : defaultForm;
            },
        },

        methods: {
            _isEmpty,
            _cloneDeep,
            open(category, parentId) {
                this.category = category;
                this.categoryParentId = parentId;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleConfirm() {
                this.$refs.Form.validate(async (valid) => {
                    if (valid) {
                        if (_isEmpty(this.category)) {
                            await this.create(this.form);
                            this.$nuxt.refresh();
                        } else {
                            await this.update(this.form);
                            this.$nuxt.refresh();
                        }
                    }
                });
            },

            async create(form) {
                try {
                    this.loading = true;
                    await this.$api.postCategories.create({ ...form, parentId: this.categoryParentId });
                    this.$message.success('Thêm mới danh mục con thành công');
                    this.close();
                } catch (e) {
                    this.$handleError(e);
                    this.$message.error('Thêm mới danh mục con thất bại');
                } finally {
                    this.loading = false;
                }
            },

            async update(form) {
                try {
                    this.loading = true;
                    await this.$api.postCategories.update(form.id, form);
                    this.$message.success('Chỉnh sửa danh mục con thành công');
                    this.close();
                } catch (e) {
                    this.$handleError(e);
                    this.$message.error('Chỉnh sửa danh mục con thất bại');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
