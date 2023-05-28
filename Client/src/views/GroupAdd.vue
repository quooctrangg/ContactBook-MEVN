<template>
    <div class="page">
        <h4>Thêm Nhóm</h4>
        <GroupForm :group="group" @submit:group="addGroup" />
    </div>
</template>

<script>
import GroupForm from '../components/GroupForm.vue'

import GroupService from '../services/group.service'

export default {
    components: { GroupForm },
    data() {
        return {
            group: {
                name: ''
            },
            message: ''
        }
    },
    methods: {
        async addGroup(data) {
            try {
                await GroupService.create(data)
                this.message = "Nhóm được thêm thành công."
                this.$router.push({ name: "contactgroup" });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>