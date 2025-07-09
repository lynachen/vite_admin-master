<template>
	<!-- <son :name="name" @get-msg="getMsg"></son> -->
	<div class="home">
		<button @click="isVisible=true">弹出一个模态对话框</button>

		<modal :visible="isVisible" :title="title" @close-modal="isVisible=false">

		</modal>
	</div>
</template>

<script>
	import { reactive, ref, toRefs } from 'vue';
	import Modal from "@/components/Modal.vue"
	import Son from '@/components/son.vue';
	export default {
		components: {
			Son,
			Modal
		},
		setup () {
			const name = ref('cp')
			const state = reactive({
				title: "用户登录",
            	isVisible: false
			})
			function getMsg(msg) {
				console.log(msg)
			}
			return {
				...toRefs(state),
				name,
				getMsg,
			}
		}
	}
</script>

<style>
</style>