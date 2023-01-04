<template>
	<div class="app-container">
		<div class="app-body">
			<el-form ref="formRef" :rules="rules" :model="dataForm" label-position="right" label-width="150px">
				<el-form-item label="上传图片" prop="images">
					<el-upload 
					    ref="uploadRef"
					    :class="{ 'disabled': dataForm.fileList.length > 4 }"
						action="#" 
						:limit="5"
						:show-file-list="true"
						list-type="picture-card" 
						:on-preview="handlePreview"
					    :on-remove="handleRemove"
					    :on-change="handleChange"
					    :on-exceed="handleExceed"
					    :file-list="dataForm.fileList"
					    :auto-upload="false"
					    accept=".jpg,.jpeg,.png,.bmp"
					>
					  	<template #default>
						    <el-icon><Plus /></el-icon>
						</template>
					</el-upload> 
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleClick('save')" round>提交</el-button>
					<el-button @click="handleClick('reset')" round>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="dialog-body">
			<!--Upload图片预览 弹出层start-->
			<!--<el-dialog v-model="imageVisible">
				<img w-full :src="imageUrl" alt="Preview Image" />
			</el-dialog>-->
			<!--Upload图片预览 弹出层end-->
			
			<!--Image图片预览 弹出层start-->
			<el-image-viewer @close="imageClose" :url-list="imageList" v-if="imageVisible"/>
			<!--Image图片预览 弹出层end-->
		</div>	
	</div>
</template>

<script>
	import { onMounted,reactive, ref, computed, toRefs, toRaw, getCurrentInstance } from "vue";
	import { useRouter } from "vue-router";
	import { ElMessage } from 'element-plus';
	import { Plus} from '@element-plus/icons-vue';
	export default {
		components: {
	    	Plus,
	  	},
		setup() {
			const formRef = ref(null);
			const uploadRef = ref(null);
			const router = useRouter();
			const state = reactive({
				imageUrl: '',
				imageList: [],
				imageVisible: false,
				dataForm: {
					fileList:[
						{
						    name: 'food.jpeg',
						    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
						},
						{
						    name: 'plant-1.png',
						    url: 'https://element-plus.gitee.io/images/plant-1.png',
						},
						{
						    name: 'food.jpeg',
						    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
						},
						{
						    name: 'plant-2.png',
						    url: 'https://element-plus.gitee.io/images/plant-2.png',
						},
					],
			   	},
			    rules: {
			        images: [
			        	{ required: true, message: "请上传合同图片", trigger: "blur" },
			        ],
			    },
			})
			const { proxy } = getCurrentInstance();
//			const uploadAliyun = async () => {
//				console.log(state.dataForm.fileUploadOss)
//				if(state.dataForm.fileUploadOss == ''){
//					const fileName = state.dataForm.filePathOss.split('.')[1]  //文件类型
//					const fileFile = state.dataForm.fileFileOss  //File对象
//				    const result = await uploadImage(fileName,fileFile);
//				    console.log(result)
//				    if (result && result.res && result.res.statusCode == 200) {
//				        console.log("上传成功");
//				        state.dataForm.fileUploadOss = result.name				    
//				    } else {
//				        ElMessage.error("上传失败");
//				        return false;
//				    }
//			    }
//			}
			onMounted(() => {
				
			});
			const handlePreview = (uploadFile) => {
				console.log(uploadFile)
		      	state.imageUrl = uploadFile.url
		      	state.imageList.push(uploadFile.url)
				state.imageVisible = true
		    }
			const handleRemove = async(file, fileList) => {
				console.log(file)
				console.log(fileList)
		   	}
			//超出限制个数提示
		    const handleExceed = (files, uploadFiles) => {
		  		ElMessage.warning(`The limit is 5, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`)
			}
		    //选择文件
		    const handleChange = (file,fileList) => {
		    	console.log(file)
				const fileImgType = file.name.match(/\.([^\.]+)$/)[1];  //匹配文件格式（最后一个'.'后的格式）或者匹配file.raw.type
		    	const isImageType = ['jpg','jpeg','png','bmp']; 
				const isLt5M = file.size / 1024 / 1024 < 5;  //判断图片格式与大小
				console.log(state.dataForm.fileList)
				state.dataForm.fileList.push(
		    		{name:file.url,  url: file.url}
		    	)
				console.log(state.dataForm.fileList)
				if (isImageType.indexOf(fileImgType)==-1) {
				    ElMessage.error('文件仅支持jpg、jpeg、png、bmp格式')  //限制文件类型
				    if(state.dataForm.fileList.length){
				    	state.dataForm.fileList.pop()
				    }else{
				    	state.dataForm.fileList = []
				    }
				    return false;
				}
				if (!isLt5M) {
				    ElMessage.error('文件不能超过5M!')  //限制文件大小
				    return false;
				}	
		   	}
//		    const getImgPreview = (img) => {
//				console.log(img)
//				state.showImageViewer = true
//			}
		    const imageClose = () => {
				state.imageUrl = []
			    state.imageVisible = false
			}
			return {
				formRef,
				uploadRef,
				...toRefs(state),
				handlePreview,
				handleRemove,
				handleChange,
				handleExceed,
//				getImgPreview,
				imageClose,
			};
		}
	};
</script>

<style lang="scss" scoped>
	.app-body {
		:deep(.el-input__inner) {
		    width: 150px;
		}
		:deep(.disabled){
			.el-upload--picture-card {
		  		display: none;  
			}
		} 
	}
</style>