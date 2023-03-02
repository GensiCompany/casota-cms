<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="_isEmpty(banner) ? 'Tạo Banner' : 'Chỉnh sửa Banner'"
    >
        <a-form-model
            ref="form"
            :model="form"
            layout="vertical"
            :colon="false"
        >
            <div class="grid grid-cols-1 gap-y-4">
                <a-form-model-item label="Hình ảnh" prop="image">
                    <div class="flex flex-col items-center gap-y-8 mb-6 w-full">
                        <img
                            v-if="form.thumbnail"
                            :src="form.thumbnail"
                            onerror="this.src='/images/default-avatar.png'"
                            alt=""
                            class="w-full h-[200px] rounded-md object-cover"
                        >
                        <div v-else class="w-full h-[200px] rounded-md border-dashed border border-gray-400 flex justify-center items-center">
                            <span><i class="fas fa-plus" /></span>
                        </div>
                        <input
                            id="thumbnailImage"
                            class="!hidden"
                            type="file"
                            accept="image/jpeg, image/png"
                            @change="previewThumbnail"
                        >
                        <div class="flex gap-x-2">
                            <div class="flex items-center w-fit px-2 py-1 rounded-lg border cursor-pointer border-[#0c4ea4] hover:bg-[#0c4ea4] hover:text-[#fff] transition duration-150 ease-out hover:ease-in border-[#d3d3d3]" @click="openSelectFile">
                                <p class="mb-0 px-3 text-sm text-black">
                                    {{ _isEmpty(banner) ? 'Upload' : 'Thay đổi' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </a-form-model-item>
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
    import _isEmpty from 'lodash/isEmpty';
    import _omit from 'lodash/omit';

    export default {
        components: {
        },
        props: {
        },
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                visible: false,
                loading: false,
                room: null,
                form: {
                    title: '',
                    link: '',
                    thumbnail: '',
                    desciption: '',
                    _id: '',
                },
                fileName: null,
                banner: null,
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
            openSelectFile() {
                document.querySelector('#thumbnailImage').click();
            },

            previewThumbnail() {
                const imageSelect = document.querySelector('#thumbnailImage').files[0];
                this.fileName = imageSelect.name;
                this.form.thumbnail = URL.createObjectURL(imageSelect);
            },

            async handlerThumbnail() {
                const formData = new FormData();
                const imageSelected = document.querySelector('#thumbnailImage').files[0];
                formData.append('image', imageSelected);
                await this.$axios.post('https://minh-long.herokuapp.com/api/uploads', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                    .then((res) => { this.form.thumbnail = res.data.data.fileAttributes[0].source; })
                    .catch((err) => console.log(err))
                    .finally(() => false);
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            if (this.fileName) {
                                await this.handlerThumbnail();
                            }
                            if (!this.form) {
                                await this.$api.banners.create({ ...this.form, status: 'active' });
                                this.$message.success('Thêm Banner thành công');
                            } else {
                                await this.$api.banners.update(this.form._id, _omit(this.form, ['_id']));
                                this.$message.success('Sửa Banner thành công');
                            }
                            this.$message.success('Thêm banner thành công');
                            this.close();
                            await this.$store.dispatch('banners/fetchAll', this.$route.query);
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
