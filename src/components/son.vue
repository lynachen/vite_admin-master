<template>
	<div id="">
		{{ name }}
		<el-button @click="setMsgToSon">set</el-button>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String
			}
		},
		// emits:['get-msg'],//声明当前组件触发的自定义事件
		setup(props,context) {
			console.log()
			console.log(props.name)
			function setMsgToSon() {
				context.emit('get-msg','这是一条来自子组件的msg信息')
			}
			return {
				setMsgToSon
			}
		}
	}
</script>

<style>
</style>