import createApiClient from "./api.service"

class ContactService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl)
    }

    async getAll() {
        return (await this.api.get("/")).data
    }

    async create(data) {
        return (await this.api.post("/", data)).data
    }

    async deleteAll() {
        return (await this.api.delete("/")).data
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data
    }

    async findByGroup(groupId) {
        return (await this.api.get(`/group/${groupId}`)).data
    }

    async updateGroupId(groupId) {
        return (await this.api.put(`/group/${groupId}`)).data
    }
}

export default new ContactService()
