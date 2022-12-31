<template>
	<div>
		<div class="all-tool">
			<div style="width:250px;height:400px;" class="course-container" id="myImage">
				<div class="course"><img style="width:250px;height:400px;" :src="coverImg" /></div>
				<div style="bottom:66px;left:50px;margin-left:50px" class="code"><img style="width:100px;height:100px;" :src="qrCode" /></div>
			</div>
		</div>
		<div class="btn-all" type="button">
			<el-button size="mini" type="primary" @click="saveImage">下载海报</el-button>
		</div>
		<a id="link"></a>
		<div>

</template>
			<script>
				import html2canvas from "html2canvas";
				export default {
					data() {
						return {
							qrCode: "",
							coverImg: ""
						};
					},
					methods: {
						saveImage() {
							html2canvas(document.querySelector("#myImage")).then((canvas) => {
								var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
								var link = document.getElementById("link");
								link.setAttribute("download", "海报.png");
								link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
								link.click();
							});
						},
					},
				};
			</script>

			<style lang="less" scoped>
				.all-tool {
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					justify-content: center;
					background: #fff;
					box-sizing: border-box;
					.course-container {
						height: 400px;
						width: 300px;
						position: relative;
					}
					.course {
						z-index: 1;
						position: absolute;
					}
					.code {
						z-index: 2;
						position: absolute;
					}
				}
				
				.btn-all {
					text-align: center;
					margin: 30px auto 0;
				}
			</style>