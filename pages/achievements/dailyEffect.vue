<template>
	<view class="basement">
		<view class="top">
			<view class="effect_money">
				<text>绩效工资</text>
				<text>{{info.allEffect}}元</text>
			</view>
			<view class="effect_index">
				<text>{{starDay}} - {{endDay}} </text>
				<text>{{info.num}} 名</text>
			</view>
			<view class="detailedList">
				<view class="secondNva">
					<view class="detailData">{{info.hoursEffect}}</view>
					<view class="">目标时效</view>
				</view>
				<view class="secondNva">
					<view class="detailData">{{info.unitPrice}}</view>
					<view class="">平均单价</view>
				</view>
				<view class="secondNva">
					<view class="detailData">{{info.coefficient}}</view>
					<view class="">技能系数</view>
				</view>
				<view class="secondNva">
					<view class="detailData">{{info.todayEffect}}</view>
					<view class="">昨日绩效</view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<yiLine>
            <view class="line">
                当日绩效工资变动解析
            </view>
        </yiLine>
		
		<view class="foot">
			<view class="change_time">{{changeData.time}} 变动</view>
			<view class="foot_nav">
				<view class="foot_title">绩效收入：</view>
				<view>{{changeData.income}} 元</view>
			</view>
			<view class="foot_nav">
				<view class="foot_title">排名：</view>
				<view class="">{{changeData.ranking}} 名</view>
			</view>
			<view class="foot_nav">
				<view class="foot_title">工作量：</view>
				<view >
				<view class="work_list" v-for="(item,index) in changeData.workload" :key="index">
					<text>{{item.name}}</text>
					<text>{{item.time}}</text>
				</view>
				</view>
			</view>
			<view class="foot_nav">
				<view class="foot_title">工作时长：</view>
				<view>
					<view>基础时长{{changeData.workTime.normal}}小时</view>
					<view>加班时长{{changeData.workTime.overTime}}小时</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import yiLine from '@/components/yi-line/yi-line.vue'
	export default {
		components: {yiLine},
		data() {
			return {
				starDay:'5月1日',
				endDay:'5月17日',
				info:{
					allEffect:3446,
					num:6,
					hoursEffect:3.6,
					unitPrice:16.50,
					coefficient:3.6,
					todayEffect:186.21
				},
				changeData:{
					time:'5月17日',
					income:'168.15',
					ranking:'51',
					workload:[{
						name:'前端源码开发',
						time:'10'
					},
					{
						name:'前端页面交互设计',
						time:'2'
					}],
					workTime:{
						normal:8,
						overTime:4
					}
				}
			}
		},
		onLoad: function (e) {
		    this.dataList = JSON.parse(e.data);
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.basement {
	width: 100%;
}
.top {
	padding: 30upx 20upx;
	margin: 18upx;
	border-radius: 8px;
	box-shadow: 1px 4px 6px #bbb;
	background-color: #0088ce;
	box-sizing: border-box;
}
.effect_money,
.effect_index {
	display: flex;
	color: #fff;
	font-size: 34upx;
	justify-content: space-between;
	align-items: center;
}
.effect_index {
	font-size: 28upx;
}

.detailedList {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.secondNva {
	width: 48%;
	height: 50px;
	margin-top: 50upx;
	color: #fff;
	text-align: center;
}
.detailData {
	font-size: 34upx;
}

.line {
	color: #000000;
	font-size: 32upx;
	padding:10px 20px
}

.foot {
	margin: 18upx;
	padding: 0 20upx;
	border-radius: 8px;
	box-shadow: 0px 2px 8px #ccc;
}
.change_time {
	display: inline-block;
	padding:10upx 10px;
	color: #fff;
	background-color: #0088ce;
}
.foot_nav {
	display: flex;
}
.foot_nav>view {
	display: inline-block;
	width: 48%;
	color: #aaa;
	margin-top: 30upx;
	text-align: left;
	font-size: 28upx;
}
.foot_nav .foot_title {
	color: #000000;
}
.foot_nav .work_list {
	display: flex;
	justify-content: space-between;
}
</style>
