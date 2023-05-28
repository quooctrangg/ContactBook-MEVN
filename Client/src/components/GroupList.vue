<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(group, index) in groups" :key="group._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index, group._id)">
            {{ group.name }} <button class="btn btn-sm btn-danger" @click="removeGroup(group._id)"><i
                    class="fas fa-trash"></i></button>
        </li>
    </ul>
</template>

<script>
import groupService from '../services/group.service';
import contactService from '../services/contact.service';
export default {
    props: {
        groups: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 }
    },
    emits: ["update:activeIndex", "update:groupId", "groupsRemove"],
    methods: {
        updateActiveIndex(index, groupId) {
            this.$emit("update:activeIndex", index)
            this.$emit("update:groupId", groupId)
        },
        async removeGroup(id) {
            try {
                if (id) {
                    await contactService.updateGroupId(id)
                    await groupService.delete(id)
                    this.$emit("groupsRemove")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.list-group-item {
    display: flex;
    justify-content: space-between;
}
</style>