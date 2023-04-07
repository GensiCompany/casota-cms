<template>
    <div :class="`w-full 'bg-white' : 'bg-[#18191a]' px-3 xl:px-0 overflow-auto pb-4`">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="pt-4">
                <div class="p-3 rounded-md bg-white">
                    <p>
                        Thông tin cơ bản
                    </p>
                    <div class="grid grid-cols-3 gap-5">
                        <a-form-model-item
                            prop="title"
                            label="Tiêu đề chính sách"
                            class="col-span-2"
                        >
                            <a-input
                                v-model="form.title"
                                placeholder="Nhập tiêu đề chính sách"
                                :disabled="isEdit"
                            />
                        </a-form-model-item>
                        <a-form-model-item
                            prop="page"
                            class="!w-full"
                            label="Chọn trang"
                        >
                            <a-select
                                v-model="form.page"
                                :disabled="isEdit"
                                placeholder="Vui lòng chọn trang"
                            >
                                <a-select-option v-for="page in PAGE_OPTIONS_HANDLE" :key="page.value" :value="page.value">
                                    {{ page.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
                    <Editor
                        :content-props="form.content"
                        :is-edit="isEdit"
                        label="Nội dung"
                        @getContent="getContent"
                    />
                </div>
            </div>
        </a-form-model>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _uniqBy from 'lodash/uniqBy';
    import _isEmpty from 'lodash/isEmpty';
    import _cloneDeep from 'lodash/cloneDeep';
    import Editor from '@/components/shared/Editor.vue';
    import { PAGE_OPTIONS, PAGE } from '@/constants/policies/page';

    const form = {
        title: '',
        content: '',
        page: null,
    };

    export default {
        components: {
            Editor,
        },

        props: {
            policy: {
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
                PAGE,
                PAGE_OPTIONS,
                form: this.policy ? _cloneDeep(this.policy) : _cloneDeep(form),
                rules: {
                    title: [{ required: true, message: 'Vui lòng nhập Tiêu đề', trigger: 'blur' }],
                    content: [{ required: true, message: 'Vui lòng nhập Nội dung bài viết', trigger: 'blur' }],
                    page: [{ required: true, message: 'Vui lòng chọn trang', trigger: 'blur' }],
                },
            };
        },

        computed: {
            ...mapState('policies', ['policies']),
            PAGE_OPTIONS_HANDLE() {
                const dataHandle = [];
                const arrHandle = [];
                const dataPoliciesPage = this.policies.map((item) => item.page);
                this.policies.forEach((element) => {
                    if (Object.values(PAGE).includes(element.page)) {
                        dataHandle.push(element);
                    }
                });
                PAGE_OPTIONS.forEach((element) => {
                    if (!dataPoliciesPage.includes(element.value)) {
                        arrHandle.push(element);
                    }
                });
                return _isEmpty(this.policy) ? [...arrHandle] : [...arrHandle, { ...PAGE_OPTIONS.find((item) => item.value === this.policy.page) }];
            },
        },

        watch: {
            policy() {
                this.form = this.policy ? _cloneDeep(this.policy) : _cloneDeep(form);
            },
        },

        methods: {
            _isEmpty,
            _uniqBy,

            getContent(content) {
                this.form.content = content;
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
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
