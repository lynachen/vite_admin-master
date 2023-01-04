<template>
	<div class="app-container">
		<div class="app-body">
			<el-form ref="formRef" :rules="rules" :model="dataForm" label-position="right" label-width="150px">
				<el-form-item label="合同模板" prop="file" class="required-item">
					<el-upload 
						ref="uploadRef"
						action="#" 
						:limit="1"
    					:on-exceed="handleExceed"
					    :on-remove="handleRemove"
					    :on-change="handleChange"
					    :file-list="dataForm.fileList"
					    :auto-upload="false"
					    :on-success="handleSuccess"
					    :multiple="false"
					    accept=".doc,.docx,.pdf"
					>
						<el-button type="primary">Click to upload</el-button>
				    	<template #tip>
				      		<div class="el-upload__tip">doc/docx/pdf files with a size less than 5M.</div>
				    	</template>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleClick('save')" round>提交</el-button>
					<el-button @click="handleClick('reset')" round>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { onMounted,reactive, ref, computed, toRefs, toRaw, getCurrentInstance } from "vue";
	import { useRouter } from "vue-router";
	import { ElMessage } from 'element-plus';
	export default {
		setup() {
			const formRef = ref(null);
			const uploadRef = ref(null);
			const router = useRouter();
			const state = reactive({
				dataForm: {
					fileList:[],

					fileUploadOss:'',					
					filePathOss:'',					
					fileFileOss:'',
			   	},
			    rules: {
			        file: [
			        	{ required: true, message: "请上传合同模板", trigger: "blur" },
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
			const handleExceed = (files, fileList) => {
				console.log(files)
		        uploadRef.value.clearFiles()  //清空上传文件（限制一个，所以直接清空即可）
				const file = files[0]
				uploadRef.value.handleStart(file)  //重新上传
		    }
			const handleRemove = async(file, fileList) => {
	      		uploadRef.value.clearFiles()  //清空上传文件
		   	}
			//上传成功时弹框
		    const handleSuccess = (res) => {
		
		    }
		    //选择文件
		    const handleChange = (file,fileList) => {
		    	console.log(file)
				const fileImgType = file.name.match(/\.([^\.]+)$/)[1];  //匹配文件格式（最后一个'.'后的格式）或者匹配file.raw.type
		    	const isImageType = ['doc','docx','pdf']; 
				const isLt5M = file.size / 1024 / 1024 < 5;  //判断图片格式与大小
				if (isImageType.indexOf(fileImgType)==-1) {
				    ElMessage.error('文件仅支持doc、docx、pdf格式')  //限制文件类型
				    uploadRef.value.clearFiles()  //清空上传文件
				    return false;
				}
				if (!isLt5M) {
				    ElMessage.error('文件不能超过5M!')  //限制文件大小
				    uploadRef.value.clearFiles()  //清空上传文件
				    return false;
				}	
		   	}
			return {
				formRef,
				uploadRef,
				...toRefs(state),
				handleExceed,
				handleRemove,
				handleSuccess, 
				handleChange,
			};
		}
	};
</script>

<style lang="scss" scoped>
	.app-body {
		:deep(.el-input__inner) {
		    width: 150px;
		}
	}
</style>