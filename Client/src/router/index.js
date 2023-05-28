import { createRouter, createWebHistory } from "vue-router"
import ContactBook from '../views/ContactBook.vue'

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("../views/ContactEdit.vue"),
        props: true
    },
    {
        path: "/add-contact",
        name: "contact.add",
        component: () => import('@/views/ContactAdd.vue')
    },
    {
        path: "/groups",
        name: "contactgroup",
        component: () => import('../views/Groups.vue')
    },
    {
        path: "/groups/add-group",
        name: "group.add",
        component: () => import('../views/GroupAdd.vue')
    },
    {
        path: "/:pathMatch(.*)",
        name: "notfound",
        component: () => import("../views/NotFound.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
