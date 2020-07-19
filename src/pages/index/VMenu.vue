<template>
    <menu-list
        class="section ofy flex flex-wrap flex-xc tc"
        li1-class="li1 br4 of"
        li11-class="block lh40 fw bg-gray"
        ul-class="flex flex-wrap flex-xc flex-yc"
        li2-class="li2 lh30 cp br4 td2"
    ></menu-list>
</template>

<script>
export default {
    components: {
        MenuList: () => import('./components/MenuList')
    }
}
</script>

<style lang="scss" scoped>
.section {
    height: calc(100% - 40px);
    padding: 50px 0;
}
.section ::v-deep {
    .li1 {
        width: 300px;
        margin: 20px;
        border: 1px solid #ccc;
    }
    ul {
        height: calc(100% - 40px);
        padding: 10px 0 20px;
    }
    .li2 {
        margin: 10px 10px 0;
        padding: 3px 6px;
        border: 1px solid;
    }
    .underway,
    .complete {
        border: 2px solid;
    }
}
</style>
