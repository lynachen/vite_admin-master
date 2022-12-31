<!-- element plus 树组件实现单选及搜索功能 -->
<template>
    <div class="tree-radio">
        <h3>Element plus 树组件实现单选及搜索功能</h3>
        <hr />
        <el-input type="text" v-model="filterText" placeholder="请输入搜索内容" />
        <hr />
        <div class="tree">
            <el-tree
                :data="treeData"
                :props="{
                    label: 'label',
                    children: 'children',
                }"
                node-key="id"
                ref="treeRef"
                show-checkbox
                check-strictly
                default-expand-all
                :filter-node-method="filterNode"
                @check-change="handleCheckChange"
            />
        </div>
        <hr />
        <el-button type="primary" @click="getCheckedTree">获取选中的节点</el-button>
    </div>
</template>

<script>
	import { onMounted,reactive, ref,computed, toRefs, toRaw, getCurrentInstance} from "vue";
	export default {
	    setup() {
	        const treeRef = ref('');
			const state = reactive({
	            filterText: '',
	            checkedId: '',
	            treeData: [
	                {
		                id: '1',
		                label: '一级架构1',
		                children: [
		                    {
		                        id: '2',
		                        label: '二级架构1-1',
		                    },
		                    {
		                        id: '3',
		                        label: '二级架构1-2',
		                    },
		                ],
		            },
		            {
		                id: '4',
		                label: '一级架构2',
		                children: [
		                    {
		                        id: '5',
		                        label: '二级架构2-1',
		                        children: [
		                            {
		                                id: '6',
		                                label: '三级架构3-1',
		                            },
		                            {
		                                id: '7',
		                                label: '三级架构3-2',
		                            },
		                        ],
		                    },
		                ],
		            },
	            ],
			})
	        // 过滤节点
	        const filterNode = (value, data) => {
	            if (!value) return true;
	            return data.label.indexOf(value) !== -1;
	        }
	        // 单选操作
	        const handleCheckChange = (data, checked) => {
	            if (checked) {
	                state.checkedId = data.id;
	                treeRef.value.setCheckedKeys([data.id]);
	            } else {
	                if (state.checkedId === data.id) {
	                    treeRef.value.setCheckedKeys([data.id]);
	                }
	            }
	        }
	        // 获取单选选中的结果
	        const getCheckedTree = () => {
	            alert(`当前选中的节点为：${state.checkedId}`);
	        }
	
	        return { 
	        	treeRef,
	        	...toRefs(state),
	        	filterNode, 
	        	handleCheckChange,
	        	getCheckedTree
	        };
	    }
	};
</script>

<style lang="scss" scoped>
.tree-radio {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    h3 {
        font-weight: 300;
        color: #ff9b61;
        font-size: 18px;
    }
    width: 500px;
    margin: 100px auto;
    .no-checkbox-node {
        & > .el-tree-node__content {
            .el-checkbox {
                display: none;
            }
        }
    }
    .el-checkbox__inner {
        border-radius: 50%;
    }
}
</style>