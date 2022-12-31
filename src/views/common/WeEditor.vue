<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>富文本编辑器2</b>
            </div>
        </template>
        <!-- 富文本 -->
        <WeEditor v-model:html="dataForm.content" @handleEditorChange="handleEditorChange"></WeEditor>
    </el-card>
</template>

<script>
import { onMounted,reactive, ref,computed, toRefs, toRaw, getCurrentInstance} from "vue";
import WeEditor from '@/components/WeEditor.vue';

export default {
    components: { WeEditor },
    setup() {
        const defaultText = ref("");
        const richText = ref("");
		const state = reactive({
			dataForm: {
				content:'',
		   },
		})
        onMounted(() => {
            // 初始化数据
            defaultText.value = "";
        });

        const handleEditorChange = nv => {
            richText.value = nv;
        };

        return { ...toRefs(state),defaultText, handleEditorChange };
    }
};
</script>

<style lang="scss" scoped>
.card_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
