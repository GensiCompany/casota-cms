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
                        v-if="isEdit"
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
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <a-form-model-item prop="username" label="Tên đăng nhập" class="!mb-5">
                        <a-input v-model="form.username" placeholder="Tên đăng nhập của người dùng" :disabled="!isEdit" />
                    </a-form-model-item>
                    <!-- <a-form-model-item prop="password" label="Mật khẩu" class="!mb-5">
                        <a-input v-model="form.password" placeholder="Mật khẩu" :disabled="!isEdit" />
                    </a-form-model-item> -->
                    <a-form-model-item prop="fullname" label="Họ và tên" class="!mb-5">
                        <a-input v-model="form.fullname" placeholder="Nhập họ và tên người dùng" :disabled="!isEdit" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Số điện thoại" prop="phoneNumber">
                        <a-input v-model="form.phoneNumber" placeholder="Nhập số điện thoại" :disabled="!isEdit" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Email" prop="email">
                        <a-input v-model="form.email" placeholder="Nhập Email nhân viên" :disabled="!isEdit" />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Giới tính" prop="email">
                        <a-select v-model="form.gender" :disabled="!isEdit">
                            <a-select-option v-for="_gender in USER_GENDER_OPTIONS" :key="_gender.value" :value="_gender.value">
                                {{ _gender.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <div class="lg:col-span-2">
                        <span class="block mb-3">Trạng thái hoạt động: <span class="font-semibold">{{ STATUS_LABEL }}</span></span>
                        <a-switch
                            :checked="isActive"
                            :disabled="!isEdit"
                            @change="changeStatus"
                        />
                    </div>
                </div>
            </div>
            <div class="card p-4 col-span-12 xl:col-span-12 rounded-md bg-white">
                <p class="font-semibold text-xl">
                    2. Địa chỉ
                </p>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a-form-model-item
                        v-if="form.address && form.address.province"
                        has-feedback
                        label="Tỉnh/Thành phố"
                        prop="address.province.id"
                    >
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
                            :disabled="!isEdit"
                            search-key="freeWord"
                            @change="(provinceId) => {
                                form.address.district.id = undefined,
                                form.address.ward.id = undefined,
                                $refs.districtSelection.emptyOptions(),
                                $refs.districtSelection.fetchData();
                            }"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="form.address && form.address.district"
                        has-feedback
                        label="Quận/Huyện"
                        prop="address.district.id"
                    >
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
                            :disabled="!isEdit || !form.address.province.id"
                            @change="(districtId) => {
                                form.address.ward.id = undefined,
                                $refs.wardSelection.emptyOptions(),
                                $refs.wardSelection.fetchData();
                            }"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="form.address && form.address.ward"
                        has-feedback
                        label="Phường, xã, thị trấn"
                        prop="address.ward.id"
                    >
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
                            :disabled="!isEdit || !form.address.district.id"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="form.address"
                        prop="address.addressDetail"
                        label="Địa chỉ cụ thể"
                        class="!mb-5"
                    >
                        <a-input v-model="form.address.addressDetail" placeholder="Nhập địa chỉ cụ thể" :disabled="!isEdit" />
                    </a-form-model-item>
                </div>
            </div>
        </div>
    </a-form-model>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    import {
        convertToFormData,
        validEmail,
        phoneValidator,
        passwordValidtor,
        usernameValidator,
    } from '@/utils/form';
    import _cloneDeep from 'lodash/cloneDeep';
    import _assign from 'lodash/assign';
    import SelectRemote from '@/components/filters/SelectRemote.vue';
    import { USER_GENDER, USER_GENDER_OPTIONS } from '@/constants/user/gender';
    import { USER_STATUS, USER_STATUS_OPTIONS } from '@/constants/user/status';

    const defaultForm = {
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
        username: '',
        password: '',
    };
    export default {
        components: {
            SelectRemote,
        },

        props: {
            loading: {
                type: Boolean,
                default: false,
            },
            user: {
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
                USER_STATUS,
                USER_STATUS_OPTIONS,
                USER_GENDER,
                USER_GENDER_OPTIONS,
                form: this.user ? _cloneDeep(_assign({}, defaultForm, this.user)) : _cloneDeep(defaultForm),
                fileAvatar: null,
                rules: {
                    username: [{ required: true, validator: usernameValidator, trigger: 'blur' }],
                    password: [{ required: true, validator: passwordValidtor, trigger: ['blur'] }],
                    fullname: [{ required: true, message: 'Vui lòng nhập họ và tên người dùng', trigger: 'blur' }],
                    email: [{
                        required: true, validator: validEmail, message: 'Vui lòng nhập đúng định dạng email', trigger: ['change', 'blur'],
                    }],
                    phoneNumber: [{
                        required: true, validator: phoneValidator, message: 'Vui lòng nhập đúng định dạng số điện thoại', trigger: ['change', 'blur'],
                    }],
                    'address.province.id': [{ required: true, message: 'Không được để trống trường này', trigger: 'blur' }],
                    'address.district.id': [{ required: true, message: 'Không được để trống trường này', trigger: 'blur' }],
                    'address.ward.id': [{ required: true, message: 'Không được để trống trường này', trigger: 'blur' }],
                    'address.addressDetail': [{ required: true, message: 'Không được để trống trường này', trigger: 'blur' }],
                },
            };
        },

        computed: {
            ...mapState('selections', ['provinces', 'districts', 'wards']),
            isActive() {
                return this.form.status === USER_STATUS.ACTIVE;
            },
            STATUS_LABEL() {
                return this.form.status === USER_STATUS.ACTIVE ? 'Hoạt động' : 'Không hoạt động';
            },
        },

        watch: {
            user: {
                handler() {
                    this.form = this.user ? _cloneDeep(_assign({}, defaultForm, this.user)) : _cloneDeep(defaultForm);
                },
                deep: true,
                immediate: true,
            },

            'form.address.province': {
                handler() {
                    if (this.form.address) {
                        this.form.address.province.name = this.provinces.find((item) => +item.id === +this.form.address.province.id)?.title;
                    }
                },
                deep: true,
                immediate: true,
            },

            'form.address.district': {
                handler() {
                    if (this.form.address) {
                        this.form.address.district.name = this.districts.find((item) => +item.id === +this.form.address.district.id)?.title;
                    }
                },
                deep: true,
                immediate: true,
            },

            'form.address.ward': {
                handler() {
                    if (this.form.address) {
                        this.form.address.ward.name = this.wards.find((item) => +item.id === +this.form.address.ward.id)?.title;
                    }
                },
                deep: true,
                immediate: true,
            },
        },

        methods: {
            moment,
            convertToFormData,

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        if (this.fileAvatar) {
                            const { data: { fileAttributes } } = await this.$api.uploaders.uploadFiles(convertToFormData({
                                files: this.fileAvatar,
                            }));
                            this.form = { ...this.form, avatar: fileAttributes[0]?.source };
                        }
                        const address = {
                            province: {
                                id: this.form.address.province.id,
                                name: this.provinces.find((item) => +item.id === +this.form.address.province.id)?.title,
                            },
                            district: {
                                id: this.form.address.district.id,
                                name: this.districts.find((item) => +item.id === +this.form.address.district.id)?.title,
                            },
                            ward: {
                                id: this.form.address.ward.id,
                                name: this.wards.find((item) => +item.id === +this.form.address.ward.id)?.title,
                            },
                        };
                        this.$emit('submit', {
                            ...this.form,
                            address: {
                                ...address,
                                addressDetail: this.form.address.addressDetail,
                            },
                        });
                    }
                });
            },

            handlerAvatar(file) {
                this.fileAvatar = file;
                this.form.avatar = URL.createObjectURL(file);
            },

            async changeStatus() {
                this.form.status = this.form.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE;
            },
        },
    };
</script>
