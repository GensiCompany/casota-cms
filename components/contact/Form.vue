<template>
    <div class="h-full flex flex-col gap-4">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
            :colon="false"
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
            </div>
        </a-form-model>
        <GmapMap
            ref="gmapMap"
            class="flex-grow flex flex-col w-full h-full"
            :center="{lat: 21.027815961169388, lng: 105.852286278556}"
            :zoom="12"
            :options="{
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false,
                clickableIcons: false,
            }"
            map-type-id="roadmap"
            @click="mark"
        >
            <GmapMarker
                :position="{
                    lat: +form.lat,
                    lng: +form.long,
                }"
                :icon="markerIcon"
            />
        </GmapMap>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';

    const defaultForm = {
        companyName: '',
        address: '',
        phoneNumber: '',
        email: '',
        lat: 21.027815961169388,
        long: 105.852286278556,
    };

    export default {
        props: {
            contact: Object,
        },

        data() {
            return {
                form: this.contact
                    ? _cloneDeep(_pick(this.contact, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
                    ],
                    image: [
                        { required: true, message: 'Vui lòng tải ảnh lên', trigger: 'change' },
                    ],
                },
                markerIcon: {
                    url: '/images/map-pin.png',
                    scaledSize: { width: 45, height: 45 },
                    labelOrigin: { x: 25, y: -25 },
                },
            };
        },

        watch: {
            contact() {
                this.form = this.contact
                    ? _cloneDeep(_pick(this.contact, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm);
            },

            'form.lat': {
                handler() {
                    this.$forceUpdate();
                },
            },
        },

        methods: {
            mark(event) {
                if (!this.disabled) {
                    this.form.lat = event.latLng.lat();
                    this.form.long = event.latLng.lng();
                }
            },

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
