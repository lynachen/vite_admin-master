<template>
	<el-carousel indicator-position="outside" arrow="always" :autoplay="false">
	    <el-carousel-item :key="index" v-for="(item,index) in list">
			<el-image class="swiper-image" :src="item" alt="会员头像缩略图" fit="cover" @click="getImgPreview(list,index)"></el-image>
	    </el-carousel-item>
	</el-carousel>
	<div class="dialog-body">
		<!--图片预览 弹出层start-->
		<el-image-viewer @close="closeImgViewer" :url-list="imageList" v-if="showImageViewer"/>
		<!--图片预览 弹出层end-->
	</div>
</template>

<script>
	import { reactive, ref, toRefs, getCurrentInstance } from "vue";
	export default {
		setup() {
			const state = reactive({
				showImageViewer:false,
				imageList:[],
				list:[
				'/src/assets/img/1.png',
				'/src/assets/img/2.png',
				'/src/assets/img/3.png',
				'/src/assets/img/404.png',
				'/src/assets/img/admin.png',
				]
			})
			const { proxy } = getCurrentInstance();
			const getImgPreview = (img,index) => {
				let img1 = [];
				let img2 = [];
				let imgs = [];
				for(let i=0;i<img.length;i++) {
					imgs.push(img[i])
				}
				if(index!=0){
					img2 = imgs.slice(index)
					img1 = imgs.slice(0,index)
					console.log(img1)
					imgs = [...img2,...img1]
					console.log(imgs)
				}
				state.imageList = imgs
				
				state.showImageViewer = true;
			}
			const closeImgViewer = () => {
				state.imageList = []
			    state.showImageViewer = false;
			}
			return {
				...toRefs(state),
				getImgPreview,
				closeImgViewer,
			}
		},
	}
</script>

<style>
</style>