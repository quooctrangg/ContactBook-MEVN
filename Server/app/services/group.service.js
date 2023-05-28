const { ObjectId } = require('mongodb')

class GroupService {
    constructor(client) {
        this.Group = client.db().collection('groups')
    }

    extractGroupData(payload) {
        const group = {
            name: payload.name
        }

        Object.keys(group).forEach(key => {
            group[key] === undefined && delete group[key]
        })
        return group
    }

    async create(payload) {
        const group = this.extractGroupData(payload)
        const result = await this.Group.findOneAndUpdate(group, { $set: {} }, { returnDocument: 'after', upsert: true })
        return result.value
    }

    async find(filter) {
        const cursor = await this.Group.find(filter);
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' }
        })
    }

    async findById(id) {
        return await this.Group.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }
        const update = this.extractGroupData(payload)
        const result = await this.Group.findOneAndUpdate(
            filter, { $set: update }, { returnDocument: 'after' }
        )
        return result.value
    }

    async delete(id) {
        const result = await this.Group.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }
}

module.exports = GroupService