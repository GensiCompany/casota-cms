<template>
    <div class="h-full flex flex-col gap-4">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
        >
            <div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 mb-2">
                    <a-form-model-item class="md:col-span-2" label="Tên công ty" prop="companyName">
                        <a-input v-model="form.companyName" placeholder="Tên công ty" />
                    </a-form-model-item>
                    <a-form-model-item label="Số điện thoại" prop="phoneNumber">
                        <a-input v-model="form.phoneNumber" placeholder="Số điện thoại" />
                    </a-form-model-item>
                    <a-form-model-item label="Email" prop="email">
                        <a-input v-model="form.email" placeholder="Email" />
                    </a-form-model-item>
                </div>
                <a-form-model-item label="Địa chỉ" prop="address">
                    <a-input v-model="form.address" placeholder="Địa chỉ" />
                </a-form-model-item>
                <a-form-model-item label="Nhúng bản đồ" prop="iframe">
                    <a-textarea v-model="form.iframe" :auto-size="{ minRows: 3, maxRows: 4 }" placeholder="Nhúng iframe vào đây" />
                </a-form-model-item>
            </div>
        </a-form-model>
        <div class="h-[300px]" v-html="form.iframe" />
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import {
        validEmail,
        phoneValidator,
    } from '@/utils/form';

    const defaultForm = {
        companyName: '',
        address: '',
        phoneNumber: '',
        email: '',
        iframe: '',
    };

    export default {
        props: {
            contact: Object,
        },

        data() {
            return {
                form: this.contact ? _cloneDeep(this.contact) : _cloneDeep(defaultForm),
                rules: {
                    companyName: [{ required: true, message: 'Vui lòng nhập tên công ty - doanh nghiệp', trigger: 'blur' }],
                    address: [{ required: true, message: 'Vui lòng nhập địa chỉ', trigger: 'change' }],
                    email: [{
                        required: true, validator: validEmail, message: 'Vui lòng nhập đúng định dạng email', trigger: ['change', 'blur'],
                    }],
                    phoneNumber: [{
                        required: true, validator: phoneValidator, message: 'Vui lòng nhập đúng định dạng số điện thoại', trigger: ['change', 'blur'],
                    }],
                },
            };
        },

        watch: {
            contact() {
                this.form = this.contact ? _cloneDeep(this.contact) : _cloneDeep(defaultForm);
                if (this.contact && !this.contact.iframe) {
                    this.form.iframe = '';
                }
            },
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
