<template>
    <el-aside :width="isCollapse ? `64px` : `200px`">
        <div class="logo">
            <img src="@/assets/img/avatar.png" alt="logo" draggable="false" />
            <span v-if="!isHide">e团油</span>
        </div>
        <el-menu
            background-color="#F5F7FD"
            text-color="#333"
            active-text-color="#E3C584"
            router
            unique-opened
            :default-active="onRouters"
            :collapse="isCollapse"
        >
        	<el-menu-item :index="concatPath(routers[0].path)">
                <Icons name="HomeFilled" />
                <template #title>首页</template>
           	</el-menu-item>
            <el-sub-menu :index="item.m_id" :key="item.m_id" v-for="(item,index) in menuList">
                <template #title>
                    <Icons :name="iconList[index]" />
                    <span>{{ item.one_m_name }}</span>
                </template>
                <el-menu-item :index="concatPath(item.one_m_url, sub.two_m_url)" v-for="(sub,subIndex) in item.two_module_list" :key="sub.subIndex">
                    <template #title>{{ sub.two_m_name }}</template>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>        
        <div class="fold" @click="changeCollapse">
            <Icons v-if="!isCollapse" name="d-arrow-left" />
            <Icons v-else name="d-arrow-right" />
        </div>
    </el-aside>
</template>

<script>
import { onMounted, computed, reactive, toRefs,getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        const state = reactive({ 
        	isCollapse: false,
        	isHide: false,
        	menuList:[],
        	iconList:['Menu','Grid','User','Goods','ChatDotRound','Mic',],
        });
        const routers = computed(() => store.state.routers);
        console.log(routers)

        const changeCollapse = () => {
            state.isCollapse = !state.isCollapse;
            state.isHide = state.isCollapse?true:false
        };

        const concatPath = (p_path, c_path = "") => {
            return `${p_path !== "" ? "/" + p_path : "/"}${c_path !== "" ? "/" + c_path : ""}`;
        };
        const userId = computed(() => store.getters.getUserId);
        const { proxy } = getCurrentInstance();
        //获取左侧菜单接口
		const getLeftModule = () => {
			const params = {
				au_id:userId.value,  //用户id
			}
			console.log(proxy.$qs.stringify(params))
	      	proxy.$axios.post('/BaseOne/getLeftModule', params)
		      	.then((res) => {
		      		const data = res.data
		      		state.menuList = data
		      	})
		      	.catch((err) => {
		        	console.log(err);
		      	});
	   	}
		const onRouters = computed(() => {
	    	console.log(route.meta)
	    	
	        if(route.meta.activeMenu) return route.meta.activeMenu;
	        return route.path;
	    });
		onMounted(() => {
		    getLeftModule();
		});
        return {
            route,
            routers,
            concatPath,
            changeCollapse,
            ...toRefs(state),
            onRouters
        };
    },
};
</script>

<style lang="scss" scoped>
@mixin noScrollBar {
    overflow: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        width: 0 !important;
    }
}

@mixin noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@mixin line($n) {
    height: $n + px;
    line-height: $n + px;
}

.el-aside {
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    background-color: #F5F7FD;  
	box-shadow: 0px 0px 20px 0px rgba(3, 18, 64, 0.1);
    overflow: hidden;
    transition: width 0.3s ease-in-out;
    -moz-transition: width 0.3s ease-in-out;
    -webkit-transition: width 0.3s ease-in-out;
    @include noSelect;
    .logo {
        @include line(80);
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
		background-color: #000;
		/*box-shadow: 0px 0px 10px 0px rgba(3, 18, 64, 0.1);*/
        img {
        	border-radius: 50%;
        }
        span {
            padding-left: 10px;
            font-size: 20px;
            color: #fff;
        }
    }

    .el-menu {
        flex: 1;
        border-right: none;
        /*background-color: #000;*/
		box-shadow: 0px 0px 20px 0px rgba(3, 18, 64, 0.1);
        @include noScrollBar;
        &:not(.el-menu--collapse) {
            width: 200px;
        }
        .el-sub-menu .el-menu-item {
        	color: #666;
        }
        :deep(.el-sub-menu .el-sub-menu__title:hover),
        .el-menu-item:hover {
        	color: #E3C584 !important;
    		background-color: #000 !important;
    		box-shadow: 0px 0px 10px 0px rgba(3, 18, 64, 0.1);
        }
    }

    .fold {
        @include line(48);
        color: #E3C584;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        background-color: #F5F7FD;
        box-shadow: 0px 0px 10px 0px rgba(3, 18, 64, 0.1);
        &:hover {
            cursor: pointer;
        }
    }
}
/* 激活选中菜单 */
.el-menu-item.is-active,
.el-menu--popup .el-menu-item.is-active {
	color: #AA733C !important;
    background-color: #fff !important;
    box-shadow: 0px 0px 10px 0px rgba(3, 18, 64, 0.1);
}
</style>
