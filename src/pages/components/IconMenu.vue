<template>
    <!-- 移动端菜单图标 -->
    <div
        class="icon-menu hide w60 h40 flex-column flex-xc flex-yc cp td2"
        :class="{ active }"
        @click="$emit('update:active', !active)"
    >
        <span class="top br2 td2"></span>
        <span class="middle br2 td2"></span>
        <span class="bottom br2 td2"></span>
    </div>
</template>

<script>
export default {
    props: {
        active: { type: Boolean, default: false }
    }
}
</script>

<style lang="scss" scoped>
.icon-menu {
    span {
        width: 22px;
        height: 2px;
        margin: 2px 0;
        background-color: #fff;
        transform-origin: 12% 50%;
    }
    &.active {
        .top { transform: rotate(45deg); }
        .middle { opacity: 0; }
        .bottom { transform: rotate(-45deg); }
    }
}
</style>
