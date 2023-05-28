<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </router-link>
                <router-link :to="{ name: 'contactgroup' }" class="nav-link">
                    Nhóm
                    <i class="fa-solid fa-people-group"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>

<style scoped>
.nav-item {
    display: flex;
}
</style>