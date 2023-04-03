<template>
    <a-form-model
        ref="productForm"
        :model="form"
        :rules="rules"
    >
        <div class="grid grid-cols-1 gap-5">
            <div class="flex flex-col gap-y-5">
                <div>
                    <div class="flex items-center gap-5 flex-wrap justify-center">
                        <a-upload
                            v-if="!isEdit && mediasAlbums.length < 8"
                            :disabled="isEdit"
                            :show-upload-list="false"
                            :transform-file="handlerPreviewFileList"
                            multiple
                        >
                            <div class="w-40 h-40 rounded-full border-dashed border border-gray-50 flex flex-col justify-center gap-y-2 items-center">
                                <span><i class="fas fa-plus" /></span>
                                <span>Tải lên</span>
                            </div>
                        </a-upload>
                        <div v-for="item,index in mediasAlbums" :key="index" class="relative group">
                            <img
                                v-if="item.source"
                                :src="item.source"
                                onerror="this.src='/images/default-avatar.png'"
                                alt=""
                                class="w-40 h-40 rounded-full object-cover border-solid p-1 border border-gray-50"
                            >
                            <span
                                v-if="!isEdit"
                                class="hidden transition duration-500 group-hover:block absolute w-full h-full text-center leading-[104px] top-0 left-0 right-0 after:content-['']
                                            after:absolute after:w-full after:h-full after:top-0 after:left-0 after:rounded-full after:right-0 after:bg-black/20 after:z-[0]"
                                @click="removeItemFileList(index)"
                            ><i class="fas fa-trash text-white relative z-[1] cursor-pointer" /></span>
                        </div>
                    </div>
                    <a-empty v-if="mediasAlbums && mediasAlbums.length === 0 && isEdit" />
                </div>
            </div>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        medias: [],
    };

    export default {
        components: {
        },

        props: {
            data: {
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
                form: this.data ? _cloneDeep(this.data) : _cloneDeep(defaultForm),
                fileThumbnail: {},
                mediasAlbums: [],
                fileMedias: [],
                categorySelected: null,
            };
        },

        watch: {
            data() {
                this.form = this.data ? _cloneDeep(this.data) : _cloneDeep(defaultForm);
                this.mediasAlbums = this.data.medias ? _cloneDeep(this.data.medias) : [];
            },
        },

        methods: {
            handlerPreviewFileList(file) {
                this.fileMedias.push(file);
                this.mediasAlbums.push({ source: URL.createObjectURL(file) });
            },

            removeItemFileList(key) {
                this.fileMedias = this.fileMedias.filter((item, index) => index !== key);
                this.mediasAlbums = this.mediasAlbums.filter((item, index) => index !== key);
                this.form.medias = this.form.medias.filter((item, index) => index !== key);
            },

            async submit() {
                this.$refs.productForm.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', { ...this.form }, this.fileThumbnail, this.fileMedias);
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
