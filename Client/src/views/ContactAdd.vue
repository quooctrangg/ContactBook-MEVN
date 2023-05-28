<template>
    <div class="page">
        <h4>Thêm Liên Hệ</h4>
        <ContactForm :contact="contact" @submit:contact="addContact" />
    </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
import ContactService from "@/services/contact.service"

export default {
    components: { ContactForm },
    data() {
        return {
            contact: {
                name: '',
                email: '',
                address: '',
                phone: '',
                groupId: null,
                favorite: false
            },
            message: "",
        }
    },
    methods: {
        async addContact(data) {
            try {
                await ContactService.create(data)
                this.message = "Liên hệ được thêm thành công.";
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>