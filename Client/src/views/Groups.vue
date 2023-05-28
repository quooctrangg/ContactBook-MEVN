<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>Nhóm liên hệ <i class="fa-solid fa-people-group"></i></h4>
            <GroupList v-if="filteredGroupsCount > 0" :groups="filteredGroups" v-model:activeIndex="activeIndex"
                v-model:groupId="groupId" @groupsRemove="refreshList" />
            <p v-else>Không có nhóm liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddGroup">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeGroup">
                <h4>Các liên hệ trong nhóm</h4>
                <ContactList :contacts="contacts" />
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue"
import GroupList from "@/components/GroupList.vue"
import ContactList from "@/components/ContactList.vue"

import GroupService from "../services/group.service"
import ContactService from "../services/contact.service"
export default {
    components: {
        InputSearch,
        GroupList,
        ContactList
    },
    data() {
        return {
            searchText: "",
            groups: [],
            activeIndex: -1,
            groupId: '',
            contacts: []
        }
    },
    watch: {
        searchText() {
            this.activeIndex = -1
        },
        groupId() {
            this.retriveGroup()
        }
    },
    methods: {
        async retrieveGroups() {
            try {
                this.groups = await GroupService.getAll()
            } catch (error) {
                console.log(error)
            }
        },
        async retriveGroup() {
            try {
                if (this.groupId != '') {
                    this.contacts = await ContactService.findByGroup(this.groupId)
                }
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveGroups()
        },
        goToAddGroup() {
            this.$router.push({ name: "group.add" })
        }
    },
    computed: {
        groupStrings() {
            return this.groups.map((group) => {
                const { name } = group
                return [name].join("")
            });
        },
        filteredGroups() {
            if (!this.searchText) return this.groups
            return this.groups.filter((_group, index) =>
                this.groupStrings[index].includes(this.searchText)
            );
        },
        filteredGroupsCount() {
            return this.filteredGroups.length
        },
        activeGroup() {
            if (this.activeIndex < 0) return null;
            return this.filteredGroups[this.activeIndex]
        }
    },
    mounted() {
        this.refreshList()
    }
}

</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>