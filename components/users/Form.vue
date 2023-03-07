<template>
    <a-form-model ref="form" :model="form" :rules="rules">
        <div class="grid grid-cols-1 gap-6">
            <div class="card p-4 col-span-12 xl:col-span-12 rounded-md bg-white">
                <p class="font-semibold text-xl">
                    1. Thông tin cơ bản
                </p>
                <div class="flex items-center gap-x-8 mb-6">
                    <img
                        v-if="form.avatar"
                        :src="form.avatar"
                        onerror="this.src='/images/default-avatar.png'"
                        alt=""
                        class="w-32 h-32 rounded-full object-cover"
                    >
                    <div v-else class="w-32 h-32 rounded-full border-dashed border border-gray-400 flex justify-center items-center">
                        <span><i class="fas fa-plus" /></span>
                    </div>
                    <a-upload
                        :show-upload-list="false"
                        action=""
                        :transform-file="handlerAvatar"
                    >
                        <div class="flex gap-x-2">
                            <img src="/images/upload.svg" alt="avatar">
                            Tải lên
                        </div>
                    </a-upload>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a-form-model-item prop="fullname" label="Họ và tên" class="!mb-5">
                        <a-input v-model="form.fullname" placeholder="Nhập tên nhân viên" :disabled="false" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Số điện thoại" prop="phone">
                        <a-input v-model="form.phone" placeholder="Nhập số điện thoại" :disabled="false" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Email" prop="email">
                        <a-input v-model="form.email" placeholder="Nhập Email nhân viên" :disabled="false" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Giới tính" prop="email">
                        <a-select v-model="form.gender">
                            <a-select-option v-for="_gender in USER_GENDER_OPTIONS" :key="_gender.value" :value="_gender.value">
                                {{ _gender.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </div>
            </div>
            <div class="card p-4 col-span-12 xl:col-span-12 rounded-md bg-white">
                <p class="font-semibold text-xl">
                    2. Địa chỉ
                </p>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a-form-model-item has-feedback label="Tỉnh/Thành phố" prop="address.provinceId">
                        <SelectRemote
                            v-model="form.address.province.id"
                            placeholder="Chọn Tỉnh, thành phố"
                            fetch-url="selections/fetchProvinces"
                            option-label="title"
                            option-value="id"
                            store="selections"
                            store-prop="provinces"
                            show-search
                            :auto-fetch="!!1"
                            search-key="freeWord"
                            @change="(provinceId) => {
                                $refs.districtSelection.emptyOptions(),
                                $refs.districtSelection.fetchData(provinceId);
                            }"
                        />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Quận/Huyện" prop="address.districtId">
                        <SelectRemote
                            ref="districtSelection"
                            v-model="form.address.district.id"
                            placeholder="Chọn Quận, huyện"
                            fetch-url="selections/fetchDistricts"
                            option-label="title"
                            option-value="id"
                            store="selections"
                            store-prop="districts"
                            :auto-fetch="!!form.address.province.id || !!form.address.district.id"
                            :search-params="{ provinceId: form.address.province.id }"
                            :disabled="!form.address.province.id"
                            @change="(districtId) => {
                                $refs.wardSelection.emptyOptions(),
                                $refs.wardSelection.fetchData(districtId);
                            }"
                        />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Phường, xã, thị trấn" prop="address.wardId">
                        <SelectRemote
                            ref="wardSelection"
                            v-model="form.address.ward.id"
                            placeholder="Phường, xã, thị trấn"
                            fetch-url="selections/fetchWards"
                            option-label="title"
                            option-value="id"
                            store="selections"
                            store-prop="wards"
                            :auto-fetch="!!form.address.ward.id || !!form.address.district.id"
                            :search-params="{ districtId: form.address.district.id }"
                            :disabled="!form.address.district.id"
                        />
                    </a-form-model-item>
                    <a-form-model-item prop="address.specific" label="Địa chỉ cụ thể" class="!mb-5">
                        <a-input v-model="form.address.addressDetail" placeholder="Nhập địa chỉ cụ thể" :disabled="false" />
                    </a-form-model-item>
                </div>
            </div>
            <div class="card p-4 col-span-12 xl:col-span-12 rounded-md bg-white">
                <p class="font-semibold text-xl">
                    3. Ghi chú
                </p>
                <div class="grid grid-cols-1 gap-4">
                    <a-form-model-item has-feedback prop="note">
                        <a-textarea v-model="form.note" placeholder="Chỉnh sửa ghi chú về nhân viên của bạn." :auto-size="{ minRows: 5, maxRows: 8 }" />
                    </a-form-model-item>
                </div>
            </div>
        </div>
    </a-form-model>
</template>

<script>
    // import { mapState } from 'vuex';
    import moment from 'moment';
    import _omit from 'lodash/omit';
    import _cloneDeep from 'lodash/cloneDeep';
    import SelectRemote from '@/components/filters/SelectRemote.vue';
    import { USER_GENDER, USER_GENDER_OPTIONS } from '@/constants/user/gender';

    const form = {
        address: {
            province: {
                id: '',
                name: '',
            },
            district: {
                id: '',
                name: '',
            },
            ward: {
                id: '',
                name: '',
            },
            addressDetail: '',
        },
        email: '',
        phoneNumber: '',
        avatar: '',
        gender: USER_GENDER.MALE,
        status: '',
        fullname: '',
    };
    export default {
        components: {
            SelectRemote,
        },

        async fetch() {
            // await this.fetchData();
        },

        data() {
            return {
                USER_GENDER,
                USER_GENDER_OPTIONS,
                loading: false,
                form: _cloneDeep(form),
                fileAvatar: null,
                rules: {
                    name: [{ required: true, message: 'Vui lòng nhập Họ và tên nhân viên', trigger: 'blur' }],
                    phone: [{ required: true, message: 'Vui lòng nhập Số điện thoại', trigger: 'blur' }],
                    email: [{ type: 'email', message: 'Vui lòng nhập đúng định dạng email', trigger: 'blur' }],
                },
            };
        },

        computed: {
            // ...mapState('staffs', ['staff']),
        },

        watch: {
            'form.address.province': {
                handler() {
                    this.form.address.district = undefined;
                    this.form.address.ward = undefined;
                },
            },
            'form.address.district': {
                handler() {
                    this.form.address.ward = undefined;
                },
            },
        },

        methods: {
            moment,
            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.$api.staffs.update(this.form._id, _omit(this.form, ['_id']));
                            this.$message.success('Chỉnh sửa nhân viên thành công');
                            this.close();
                        } catch (e) {
                            this.$handleError(e);
                        } finally {
                            this.loading = false;
                        }
                    } else {
                        this.$message.error('Cần nhập đủ trường!');
                    }
                });
            },
            handlerAvatar(file) {
                this.fileAvatar = file;
                this.form.avatar = URL.createObjectURL(file);
            },
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('staffs/fetchDetail', this.$route.params.id);
                    this.form = _cloneDeep(this.staff);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
