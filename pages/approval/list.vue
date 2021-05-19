<template>
	<MeScroll :up="up" :down="down" @up="upFn" :fixed="false" @down="downFn" @init="initMeScroll">
		<view class=" nav_box" v-for="(item,index) in dataList" :key="index">
		
		<view class="" v-if="item.type">
			<view class="nav_title">
				<text>{{item.user}}提交的请假申请</text>
			</view>
			<view class="nav_type">
				<text>请假类型：</text>
				<text>请假</text>
			</view>
			<view class="nav_time">
				<text>请假时间：</text>
				<text>{{item.starTime}}</text>-<text>{{item.endTime}}</text>
			</view>
			<view class="nav_time_length">
				<text>请假事由：</text>
				<text>{{item.reason}}</text>
				<text class="state">{{item.reason?'处理中':''}}</text>
			</view>
		</view>
		
		<view class="" v-if="!item.type">
			<view class="nav_title">
				<text>navyvy_c提交的出差申请</text>
			</view>
			<view class="nav_type">
				<text>出差事由：</text>
				<text>项目交付</text>
			</view>
			<view class="nav_time">
				<text>出差时间：</text>
				<text>2020/06/05</text>-<text>2020/06/09</text>
			</view>
			<view class="nav_time_length">
				<text>出差时长：</text>
				<text>3</text>天
				<text class="state">处理中</text>
			</view>
		</view>
		
		</view>
		
	</MeScroll>
</template>

<script>
	import MeScroll from '../../components/mescroll-uni/mescroll-uni.vue'
	export default {
		components:{
			MeScroll
		},
		props: {
			type: Number,
			i: Number
		},
		data() {
			return {
				dataList:[{
					user:'navy_c',
					type:0, 		//0 出差， 1：请假   2：打卡异常
					reason:'项目交付',
					starTime:'2022/2/14',
					endTime:'2022/2/15',
					timeLength:'4',
					state:0 		//0处理中   1驳回  2同意
				},{
					user:'navy_c',
					type:1, 		//0 出差， 1：请假   2：打卡异常
					reason:'家里有事',
					starTime:'2021/2/14',
					endTime:'2021/2/15',
					timeLength:'3',
					state:0 		//0处理中   1驳回  2同意
				},],
				total: 30,
				isInit: false, // 是否初始化
				list: [], // 列表数据
				meScroll: null, // meScroll 对象
				// 上拉配置参数
				up: {
					auto: false,
					page: {
						page: 0,
						size: 10
					}
				},
				// 下拉配置参数
				down: {
					auto: false
				}
			}
		},
		
		watch:{
			type(val) {
				if(!this.isInit && val === this.i) {
					this.meScroll.resetUpScroll()
				}
			}
		},
		
		mounted() {
			if(!this.isInit && this.i === 0) {
				this.meScroll.resetUpScroll()
			}
		},
		
		onLoad() {

		},
		methods: {
			
			/**
			 * mescroll 初始化组件
			 * */ 
			initMeScroll(meScroll) {
				this.meScroll = meScroll
			},
			
			/**
			 * 上拉回调
			 * */
			upFn(meScroll) {
				setTimeout(() => {
					let arr = [1,1,1,1,1,1,1,1,1,1]
					this.list = [...this.list,...arr]
						meScroll.endBySize(arr.length, this.total)
				}, 1000)
			},
			
			/**
			 * 下拉回调
			 * */
			downFn(meScroll) {
				this.list = []
				meScroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.item {
		box-sizing: border-box;
		height: 200upx;
		width: 100%;
		margin-bottom: 10px;
		background: #ccc;
	}

	.nav_title {
		font-size: 32rpx;
		color: #333;
		box-shadow: 0 1px 0 #ccc;
		padding-bottom: 3px;
		margin-bottom: 3px;
	}
	.nav_box {
		color: #aaa;
		box-sizing: border-box;
		margin-top: 20upx;
		border-radius: 7px;
		padding: 20upx;
		box-shadow: 0 0 3px #ccc;
		border: 1px solid #ccc;
	}
	.nav_time_length {
		position: relative;
	}
	.state {
		position: absolute;
		right: 0;
		color: #ff4a0e;
	}
</style>
