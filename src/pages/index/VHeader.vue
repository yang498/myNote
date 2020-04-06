<template>
    <header class="h40 tc c-white flex flex-xsb">
        <!-- aside 收缩菜单触发按钮 -->
        <!-- <div
            :class="['icon-toggle', asideToggle ? 'active' : '']"
            @click="asideToggle = !asideToggle"
        >
            <span class="icon-top"></span>
            <span class="icon-middle"></span>
            <span class="icon-bottom"></span>
        </div>-->

        <!-- 左边的目录 -->
        <!-- <ul class="menu"> -->
        <!-- 一级目录 -->
        <!-- <li @click="directory" :class="index ? 'active' : ''">
                <img src="img/logo.jpg" />
            </li>
            <li
                v-for="(parentValue, parentKey) in commonData"
                :class="menuParent === parentKey ? 'active' : ''"
            >
                <span v-cloak>{{parentValue.name || parentKey}}</span>
        <ul>-->
        <!-- 二级目录，name 作为中文表示所以不显示 -->
        <!-- <li
                        v-for="(childValue, childKey) in parentValue"
                        v-if="childKey !== 'name'"
                        :class="menuChild === childKey ? 'active' : ''"
                        @click="changePage(parentKey, childKey)"
        >{{childValue.name || childKey}}</li>-->
        <!-- </ul>
            </li>
        </ul>-->

        <!-- 右边的菜单 -->
        <!-- <div :class="['option', optionToggle?'active':'']"> -->
        <!-- 设置 -->
        <!-- <div class="set hover">
                <i class="iconfont icon-shezhi"></i>
                <ul>
                    <li class="skin hover">
                        <i class="iconfont icon-skin"></i>
                    </li>
                    <li class="skin hover">
                        <i class="iconfont icon-skin-fill"></i>
                    </li>
                </ul>
        </div>-->
        <!-- 搜索框 -->
        <!-- <div class="search">
                <i
                    :class="['iconfont icon-search',isSearch?'active':'']"
                    @click="isSearch=!isSearch"
                ></i>
                <transition enter-class="active" leave-to-class="active">
                    <input type="text" placeholder="搜索建设中" v-if="isSearch" />
                </transition>
        </div>-->
        <!-- github -->
        <!-- <a
                class="git"
                href="https://github.com/yang498/note"
                target="_blank"
                @click="hideOption"
            >
                <i class="iconfont icon-git"></i>
        </a>-->
        <!-- 回到顶部/底部 -->
        <!-- <i
                class="iconfont icon-arrowhead-bottom back-top"
                onclick="scrollToTop(document.body.scrollHeight)"
                @click="hideOption"
            ></i>
            <i
                class="iconfont icon-arrowhead-top back-top"
                onclick="scrollToTop(0)"
                @click="hideOption"
        ></i>-->
        <!-- </div> -->

        <!-- 右边的菜单收缩触发按钮 -->
        <!-- <div
            :class="['icon-toggle', optionToggle ? 'active' : '']"
            @click="optionToggle = !optionToggle"
        >
            <span class="icon-top"></span>
            <span class="icon-middle"></span>
            <span class="icon-bottom"></span>
        </div>-->
    </header>
</template>

<script>
export default {
    data () {
        return {}
    },
    mounted () {},
    methods: {
        init () {}
    }
}
</script>

<style lang="scss" scoped>
i.iconfont {
    font-size: 20px;
}
.menu li:hover,
.menu li.active,
.search i:not(.active):hover,
.option > *:hover,
.icon-toggle:hover {
    background-color: #08f; // $blue
}
.menu > li,
.set {
    cursor: pointer;
    position: relative;
    &:hover ul {
        height: auto;
        opacity: 1;
    }
    ul {
        width: 100%;
        height: 0;
        opacity: 0;
        overflow: hidden;
        // background-color: $weex;
        border-radius: 0 0 5px 5px;
        // transition: $ti-fast ease-out;
        position: absolute;
        top: 100%;
        left: 0;
        li {
            line-height: 40px;
            // transition: $ti-fast ease-out;
        }
    }
}
.icon-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 40px;
    cursor: pointer;
    // transition: $ti-fast ease-out;
    span {
        width: 22px;
        height: 2px;
        margin: 2px 0;
        background-color: #fff;
        border-radius: 1px;
        // transition: $ti-fast ease-out;
        transform-origin: 12% 50%;
    }
    &.active {
        .icon-top {
            transform: rotate(45deg);
        }
        .icon-middle {
            opacity: 0;
        }
        .icon-bottom {
            transform: rotate(-45deg);
        }
    }
}
.menu {
    display: flex;
    img {
        height: 40px;
        vertical-align: top;
    }
    & > li {
        width: 100px;
        line-height: 40px;
        // transition: $ti-fast ease-out;
    }
}
.option {
    display: flex;
    height: 40px;
    .search {
        display: flex;
        position: relative;
        i {
            cursor: pointer;
            transition: 0.3s ease-out;
            &.active {
                color: #ccc;
                cursor: default;
                transform: translateX(-255px);
            }
        }
        input {
            width: 300px;
            height: 34px;
            padding: 0 5px 0 30px;
            border-radius: 5px;
            position: absolute;
            top: 3px;
            right: 0;
            z-index: -1;
            opacity: 1;
            transition: 0.3s ease-out;
            &.active {
                width: 60px;
                opacity: 0;
            }
        }
    }
    .search i,
    .set,
    .git,
    .back-top {
        width: 60px;
        line-height: 40px;
    }
    .back-top {
        display: block;
        // transition: $ti-fast ease-out;
        cursor: pointer;
    }
}
</style>
