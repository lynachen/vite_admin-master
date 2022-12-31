<template>
  	<we-editor
  		class="we-editor"
	    toolbar-class="toolbar"
	    editable-class="editable"
	    toolbar-style="border: 1px solid #d9d9d9"
	    editable-style="border: 1px solid #d9d9d9;border-top:none;"
	    :toolbar-option="toolbar"
	    :editable-option="editable"
	    :toolbar-reloadbefore="onToolbarReloadBefore"
	    :editable-reloadbefore="onEditableReloadBefore"
	    v-model="formData.jarr"
	    v-model:json="formData.jstr"
	    v-model:html="formData.html"
  	/>
</template>


<script>
  	// 引入 wangeditor5 样式
  	import '@wangeditor/editor/dist/css/style.css'

  	import { WeEditor, useWangEditor } from 'wangeditor5-for-vue3'
  	import { defineComponent, shallowReactive, onMounted } from 'vue'
	import { ElMessage, ElNotification } from 'element-plus';
  	export default defineComponent({
	    components: { WeEditor },
	    props:{
		    //父传子实现 3.接收父组件传来的属性
		    defaultHtml: { type: String, default: ''},
		},
	    setup(props, context) {
	      	// 编辑器配置
	      	const editableOption = {
				mode: 'simple',
	      		config:{
			        MENU_CONF:{
			            fontSize:{
			                fontSizeList: [
			                    // 元素支持两种形式
			                    //   1. 字符串；
			                    //   2. { name: 'xxx', value: 'xxx' }
			                    '16px',
			                    '20px',
			                    { name: '26px', value: '26px' },
			                    '40px',
			                ]
			            },
			        },
					readOnly:false, // 开启只读模式
			        placeholder: '请输入',
			        maxLength: 10000,
					onCreated:(editor) => {
						console.log('created',props.defaultHtml=="<p><br></p>"?'':props.defaultHtml)
					},
					onChange:(editor) => {
						// 注意：就算你什么都没输入，它的值也默认是"<p><br></p>"，所以需要排除
						console.log('onChange',editor.getHtml())
						context.emit('handleEditorChange',editor.getHtml()=="<p><br></p>"?'':editor.getHtml())
					},
					customPaste:(editor, event) => {
						console.log(editableOption.config.maxLength)
						// event 是 ClipboardEvent 类型，可以拿到粘贴的数据
						// 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

						const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
						const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
						const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）
						console.log(html)
						console.log(text)
						console.log(editor.getText())
						if(text.length>editableOption.config.maxLength){
							ElMessage.warning('复制文本超过'+editableOption.config.maxLength+'字符')
						}else{
							editor.insertText(text)
						}
					},
					onMaxLength:(editor) => {
						console.log(editor.getHtml())
					},
			    },
				delay: 300,
				extendCache: true,
	      	}
	
	      	// 菜单栏配置
	      	const toolbarOption = {
	      		mode: 'simple', // 指定简介模式
			    config:{
//			        toolbarKeys:[
//			            "fontSize",'header1', 'header2', 'header3','header4','|',
//			            'blockquote',"code","codeBlock",'|',
//			            'bold', 'underline', 'italic', 'through', 'color', 'bgColor', 'clearStyle', '|',
//			            'bulletedList', 'numberedList', 'todo', 'justifyLeft','justifyCenter', 'justifyRight', '|',
//			            'insertLink',
//			            {
//			                key: 'group-image',
//			                title: '图片',
//			                iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
//			                menuKeys: ['insertImage', 'uploadImage']
//			            },
//			            "insertTable",
//			            "|",
//			            "undo","redo"
//			        ],
			        excludeKeys: [
			        	'insertImage',
			        	'uploadImage',
			        	'group-image',
			            'insertVideo',
			            'uploadVideo',
			            'group-video'
			        ]
			    }
	      	}
	
	      	// 防抖时长。当会触发重载的配置项发生变化 365ms 后，编辑器会重载
	      	const reloadDelary = 365
	
	      	const { editable, toolbar, getEditable, getToolbar, clearContent, syncContent, reloadEditor } = useWangEditor(
	        	editableOption,
	        	toolbarOption,
	        	reloadDelary,
	      	)

			
			onMounted(() => {
				setTimeout(() => {
//					// 当你进行了 v-model/v-model:json/v-model:html 绑定时，
//					// 如果你想在编辑器重载后将 defaultContent 显示为编辑器的默认内容，
//					// 那么你需要设置 extendCache 为 false，这会导致编辑器内容的丢失，
//					// 可以合理搭配 reloadbefore 事件进行处理
					editable.extendCache = false
//
//					// 然后再修改配置
//					// editable.defaultContent = [{ type: 'header1', children: [{ text: '标题一' }] }]
//
//					// // 同时还支持字符串形式的 JSON
//					// editable.defaultContent = '[{"type":"header1","children":[{"text":"标题一"}]}]'
//
//					// or：配置 HTML 字符串
					editable.defaultHtml = props.defaultHtml=="<p><br></p>"?'':props.defaultHtml
//					console.log('props',props.defaultHtml)
//					// 最后，你还需要强制重载编辑器
					reloadEditor()
				}, 100)
			})
			
	      	// 不要使用 reactive/ref，应该使用 shallowReactive/shallowRef 来接收 json array 数据
			const formData = shallowReactive({ 
	      		jarr: [], 
	      		jstr: '', 
	      		html: '' 
	      	})
	
	      	const onEditableReloadBefore = (inst) => {
	      		console.log('editable 即将重载: ' + new Date().toLocaleString())
	      	}
	
	      	const onToolbarReloadBefore = (inst) => {
	        	console.log('toolbar 即将重载: ' + new Date().toLocaleString())
	      	}
	
	      	return { editable, toolbar, formData, onEditableReloadBefore, onToolbarReloadBefore }
	    }
  	})
</script>
