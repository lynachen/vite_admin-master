<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
const emits = defineEmits(['update:distance']);
const props = defineProps({
  	location: Array,
});
const distance = ref('');
const mapContainer = ref(null);
let map = null;

onMounted(() => {
	loadAMap();
});

onUnmounted(() => {
  	map?.destroy();
});

const loadAMap = () => {
	window._AMapSecurityConfig = {
    	securityJsCode: "b3329fa876992d8c00538abefceacff1",
  	};
  	AMapLoader.load({
	    key: "1fde940c06beb98f599c553739b4adf9", // 申请好的Web端开发者Key，首次调用 load 时必填
	    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
	    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  	})
    .then((AMap) => {
    	distance.value = AMap.GeometryUtil.distance([props.location[0].longitude, props.location[0].latitude], [props.location[1].longitude, props.location[1].latitude]);
    	emits('update:distance', distance.value); // 触发事件，传递距离
    	initMap(AMap);
    })
    .catch((e) => {
      	console.log(e);
    });
};

const initMap = AMap => {
	map = new AMap.Map(mapContainer.value, {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
//      center: [116.397428, 39.90923], // 初始化地图中心点位置
  	});
    // 起点
    var startMarker = new AMap.Marker({
        position: new AMap.LngLat(props.location[0].longitude, props.location[0].latitude),
//      icon: startIcon,
        offset: new AMap.Pixel(-13, -30),
        content: '<div class="marker-icon start-icon">装</div>' // 自定义文本
    });
    // 终点
    var endMarker = new AMap.Marker({
        position: new AMap.LngLat(props.location[1].longitude, props.location[1].latitude),
//      icon: endIcon,
        offset: new AMap.Pixel(-13, -30),
        content: '<div class="marker-icon end-icon">卸</div>' // 自定义文本
    });

    // 将 markers 添加到地图
    map.add([startMarker, endMarker]);
};
        
        
</script>

<template>
  	<div id="container" ref="mapContainer"></div>
</template>

<style scoped>
	#container {
	  	width: 100%;
	  	height: 800px;
	}
	:deep(.marker-icon) {
		width: 30px;
		height: 30px;
		background-color: #ff0000;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #fff;
	}
</style>
