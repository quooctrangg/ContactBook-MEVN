<template>
    <form @submit.prevent="submitGroup" :validation-schema="groupFormSchema">
        <div class="form-group">
            <label for="Name">Tên nhóm</label>
            <Field name="name" type="text" class="form-control" v-model="groupLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="groupLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteGroup">Xóa</button>
        </div>
    </form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: { Form, Field, ErrorMessage },
    props: { group: { type: Object, required: true } },
    data() {
        const groupFormSchema = yup.object().shape({
            name: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự.").max(50, "Tên có nhiều nhất 50 ký tự.")
        })
        return {
            groupLocal: this.group, groupFormSchema
        }
    },
    emits: ["submit:group", "delete:group"],
    methods: {
        submitGroup() {
            this.$emit("submit:group", this.groupLocal)
        },
        deleteGroup() {
            this.$emit("delete:group", this.groupLocal.id)
        }
    }
}

</script>