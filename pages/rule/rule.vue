<template>
	<view>
		<view class="sign-title">
			<view class="sign-title-l">
				<view class="portrait">
					{{name.substr(-2)}}
				</view>
				<view class="text">
					<view class="name">
						{{name}}
					</view>
					<view class="gz" >
						考勤组:公司考勤
					</view>
				</view>
			</view>
		</view>
		<uni-collapse :accordion="true">
			<uni-collapse-item :open=" index == 0 ? true : false " :title="item.title" :show-animation="true" v-for="(item,index) in collData" :key="index">
				<view style="padding: 30upx 20upx;" v-for="(item2,index2) in item.content1" :key="index2">
					<view class="con-t">
						{{item2.title}}
					</view>
					<view class="con-c" v-html="item2.content">
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {uniCollapse,uniCollapseItem,},
		data() {
			return {
				name:"我的名字",
				collData:[
					{
						id:0,
						title:"考勤时间",
						content1:[
							{title:`上班时间`,content:`周一,二,三,四,五 全天班次: 09:00-18:00  <br/> 休息时间: 12:30-13:00 <br/> 周六 ， 周日 休息 <br/> `},
							{title:`迟到与早退`,content:`所有班次 <br/> 提前下班视为早退 <br/> `},
						],
					},
					{
						id:1,
						title:"考勤范围",
						content1:[
							{title:"办公地点",content:"山西省太原市小店区***街道**大厦  <br/>  外勤打卡将会同步给主管"},
						],
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.sign-title{display: flex;justify-content: space-between; padding: 30upx 24upx;border-bottom: 1upx solid #333;}
	.sign-title .portrait{width: 100upx;height: 100upx;line-height: 100upx;border-radius: 50%;background-color: #007AFF;color: #fff;font-size: 28upx;text-align: center;}
	.sign-title .sign-title-l{display: flex;}
	.sign-title .sign-title-l .text{margin-left: 20upx;}
	.sign-title .sign-title-l .text .name{font-size: 32upx;}
	.sign-title .sign-title-l .text  .gz{color: #111;}
	
	.con-t{font-weight: bold;color:#000;}
	.con-c{color:#555;}
</style>
