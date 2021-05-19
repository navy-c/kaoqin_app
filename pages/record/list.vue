<template>
	<MeScroll :up="up" :down="down" @up="upFn" :fixed="false" @down="downFn" @init="initMeScroll">
		<!-- <view class="item" v-for="(item,index) in list" :key="index">{{index+1}}</view> -->
		<view class="basement">
			<view class="top">
				<view class="name_nav">
					<text class="name_r">N</text>
					<text class="name">Navy</text>
					考勤组：{{kqz}}
				</view>
				<view class="data_msg">
					<text>3月汇总</text>
					<text @tap="selectorVisible=true">
						<view class="cgray search_select">
							<text>{{time}}</text>
							<uni-icons color="gray" type="arrowdown" class="down_icon"></uni-icons>
						</view>
					</text>
				</view>
				<view class="kaoqing_msg">
					<view class="">
						<text style="color: #ff5500;">1</text>
						<view class="">缺卡（次）</view>
					</view>
					<view class="">
						<text style="color: #ff5500;">2</text>
						<view class="">迟到（次）</view>
					</view>
					<view class="">
						<text style="color: #f11;">0</text>
						<view class="">早退（次）</view>
					</view>
				</view>
			</view>
		
			<view class="record">
				<view class="record_title">当月考勤记录（3月）</view>
				<view class="">
					<text class="red_icon">*</text>计算周期：
					<text>{{zhouqi1}} 至 {{zhouqi2}}</text>
				</view>
				<view class="">
					<text class="red_icon">*</text>图例说明：
					<text>{{tuli}}工作日</text>
				</view>
			</view>
			<view class="calendar">
				<tale-calendar
				name="calendar"
				bgColor="#4198f8"
				selColor="#4198f8"
				textColor="#4198f8"
				:showText="false"
				:showDot="true"
				:extraData="extraData"
				@calendarTap="calendarTap"
				@monthTap="monthTap"/>
			</view>
			<view class="foot">
				友情提示：每月3号后无法清除上月异常考勤
			</view>
		</view>
	</MeScroll>
</template>

<script>
	import {formateDates,getCurrentMonthFirst,getCurrentMonthLast} from "@/common/util.js"
	import MeScroll from '../../components/mescroll-uni/mescroll-uni.vue'
	import taleCalendar from '@/components/tale-calendar/calendar.vue'
	
	export default {
		components:{
			MeScroll,taleCalendar
		},
		props: {
			type: Number,
			i: Number
		},
		data() {
			return {
				kqz:"IT研发部",
				time:'2021年06月',
				selectorVisible:'false',
				zhouqi1:getCurrentMonthFirst(),
				zhouqi2:getCurrentMonthLast(),
				tuli:'22',
				extraData: [
					{date: '2021-05-01', value: '未签到', dot: true, active: true},
					{date: '2021-05-02', value: '签到', dot: true, active: false},
					{date: '2021-05-03', value: '签到', dot: true, active: false},
					{date: '2021-05-04', value: '未签到', dot: true, active: true},
					{date: '2021-05-05', value: '未签到', dot: true, active: true},
					{date: '2021-05-06', value: '签到', dot: true, active: true},
					{date: '2021-05-07', value: '签到', dot: true, active: true},
					{date: '2021-05-08', value: '未签到', dot: true, active: true},
					{date: '2021-05-09', value: '签到', dot: true, active: true},
					{date: '2021-05-10', value: '签到', dot: true, active: true},
					{date: '2021-05-11', value: '签到', dot: true, active: true},
					{date: '2021-05-12', value: '签到', dot: true, active: true},
					{date: '2021-05-13', value: '签到', dot: true, active: true},
					{date: '2021-05-14', value: '签到', dot: true, active: true},
					{date: '2021-05-15', value: '签到', dot: true, active: true},
					{date: '2021-05-16', value: '签到', dot: true, active: true},
					{date: '2021-05-17', value: '签到', dot: true, active: true},
					{date: '2021-05-18', value: '签到', dot: true, active: true},
					{date: '2021-05-19', value: '签到', dot: true, active: true},
					{date: '2021-05-20', value: '签到', dot: true, active: true},
					{date: '2021-05-21', value: '签到', dot: true, active: true},
					{date: '2021-05-22', value: '签到', dot: true, active: true},
					{date: '2021-05-23', value: '签到', dot: true, active: true},
                ],
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
			},
			calendarTap(e) {
                console.log(e);
            },
            monthTap(val) {
                let {year, month} = val;
                this.month = {
                    year: year,
                    month: month,
                }
                // 此处获取动态的数据，赋值给extraData
                this.extraData = [
				    {date: '2021-06-01', value: '', dot: true, active: true},
					{date: '2021-06-02', value: '签到', dot: true, active: true},
					{date: '2021-06-03', value: '签到', dot: true, active: true},
					{date: '2021-06-04', value: '未签到', dot: true, active: true},
					{date: '2021-06-05', value: '未签到', dot: true, active: true},
					{date: '2021-06-06', value: '签到', dot: true, active: true},
					{date: '2021-06-07', value: '签到', dot: true, active: true},
					{date: '2021-06-08', value: '未签到', dot: true, active: true},
					{date: '2021-06-09', value: '签到', dot: true, active: true},
					{date: '2021-06-10', value: '签到', dot: true, active: true},
					{date: '2021-06-11', value: '签到', dot: true, active: true},
					{date: '2021-06-12', value: '签到', dot: true, active: true},
					{date: '2021-06-13', value: '签到', dot: true, active: true},
					{date: '2021-06-14', value: '签到', dot: true, active: true},
					{date: '2021-06-15', value: '签到', dot: true, active: true},
					{date: '2021-06-16', value: '签到', dot: true, active: true},
					{date: '2021-06-17', value: '签到', dot: true, active: true},
					{date: '2021-06-18', value: '签到', dot: true, active: true},
					{date: '2021-06-19', value: '签到', dot: true, active: true},
					{date: '2021-06-20', value: '签到', dot: true, active: true},
					{date: '2021-06-21', value: '签到', dot: true, active: true},
					{date: '2021-06-22', value: '签到', dot: true, active: true},
					{date: '2021-06-23', value: '签到', dot: true, active: true},
				
				];
            }
		}
	}
</script>

<style>
	.basement {
		background-color: #eee;
	}
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

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.top {
		padding: 10upx 20upx;
		margin-bottom: 20upx;
		background-color: #fff;
		border-radius:0 0 40upx 40upx;
	}
	.name_nav {
		color:#999
	}
	.name {
		color: #000000;
		margin: 0 30upx;
	}
	.name_r {
		display: inline-block;
		width: 80upx;
		height: 80upx;
		color: #fff;
		font-size: 36upx;
		text-align: center;
		line-height: 80upx;
		background-color: #33a0d8;
		border-radius: 50%;
	}
	.data_msg {
		background-color: #fff;
		display: flex;
		color: #000000;
		font-size: 30upx;
		justify-content: space-around;
	}	
	.kaoqing_msg {
		display: flex;
		color: #999999;
		text-align: center;
		justify-content: space-around;
	}
	
	.record,.foot {
		background-color: #fff;
		padding: 10upx 20upx;
	}
	.record_title {
		font-size: 32upx;
		margin-bottom: 8upx;
	}
	.red_icon {
		margin: 4upx;
		color: #f11;
	}
	.calendar {
		background-color: #fff;
	}
	
	.foot{
		color:#888
	}
	
</style>
