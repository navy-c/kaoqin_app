<template>
	<view class="basement">
		
		 <view v-for="(item,index) in dataList" :key="index">
			<uni-section :title="item.title"  type="line" >
				<view class="rules" @click="typeCilck(dataList,item)">
					<text>按照{{item.type ? '小时' : '半天'}}计算</text>
					<uni-icons color="#ccc" type="arrowright"></uni-icons>
				</view>
			</uni-section>
		 </view>
	</view>
</template>

<script>
import wlGroup from '@/components/wl-group/wl-checkbox.vue'
export default {
	components: {wlGroup},
    data() {
        return {
			dataList:[{
				title:'事假',
				type:0,
			},{
				title:'调休',
				type:0
			},{
				title:'病假',
				type:0
			},{
				title:'产假',
				type:0
			},{
				title:'婚假',
				type:0
			},{
				title:'年假',
				type:0
			},{
				title:'哺乳假',
				type:1
			},{
				title:'年假报备',
				type:0
			}] //假期类型
           }
    },
    methods: {
	 typeCilck:function(obj,item){
	      uni.navigateTo({
	     	 url:'./vacation_type?data='+encodeURIComponent(JSON.stringify(obj)) + '&chooseType=' + JSON.stringify(item)
	       });
	 },
    }
}
</script>

<style scoped>
	.basement {
		width: 100%;
		height: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	.rules {
		width: 60%;
		display: flex;
		color: #ccc;
		justify-content: space-between;
		align-items: center;
	}
</style>
