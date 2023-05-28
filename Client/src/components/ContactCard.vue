<script>
import groupService from '../services/group.service';
export default {
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        return {
            groupName: null
        }
    },
    methods: {
        async findNameGroup(groupId) {
            try {
                if (groupId) {
                    this.groupName = await groupService.get(groupId)
                }
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.findNameGroup(this.contact.groupId)
        },
    },
    watch: {
        contact() {
            this.groupName = null
            this.refreshList()
        }
    },
    mounted() {
        this.refreshList()
    }
};
</script>

<template>
    <div>
        <div class="p-1"><strong>Tên:</strong>{{ contact.name }}</div>
        <div class="p-1"><strong>E-mail:</strong>{{ contact.email }}</div>
        <div class="p-1"><strong>Địa chỉ:</strong>{{ contact.address }}</div>
        <div class="p-1"><strong>Điện thoại:</strong>{{ contact.phone }}</div>
        <div v-if="groupName !== null" class="p-1"><strong>Nhóm:</strong>{{ groupName.name }}</div>
        <div class="p-1">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="contact.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>
