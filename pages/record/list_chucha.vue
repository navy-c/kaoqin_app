<template>
	<MeScroll :up="up" :down="down" @up="upFn" :fixed="false" @down="downFn" @init="initMeScroll">
		<!-- <view class="item" v-for="(item,index) in list" :key="index">{{index+1}}</view> -->
		<view class="basement">
			<view class="top_search">
				<view class="top_search_nav" @tap="selectorVisible_state=true">
					<view class="result">状态：</view>
					<view class="cgray search_select">
						<text>{{result_state.result}}</text>
						<uni-icons color="gray" type="arrowdown" class="down_icon"></uni-icons>
					</view>
				</view>
				<view class="top_search_nav" @tap="selectorVisible_time=true">
					<view class="result">时间：</view>
					<view class="cgray search_select">
						<text>{{result_time.result}}</text>
						<uni-icons color="gray" type="arrowdown" class="down_icon"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<!-- <text class="big_time">{{result_time.result}}</text>
			<view class="dataList">
				<view class="dataListTitle">事假</view>
				<view class="dataListTime">
					{{datalist.list.starTime}}-{{datalist.list.endTime}}
				</view>
			</view> -->
			
			<view class="" v-for="(item,index) in datalist" :key="index">
				<text class="big_time">{{item.time}}</text>
				<view class="dataList" v-for="(a,i) in item.list" :key="i">
					<view class="dataListRight">
						<view class="dataListTime">{{a.starTime}}-{{a.endTime}}</view>
						<view class="line">|</view>
					</view>
					
					<view class="dataListLeft">
						<uni-tag v-if="a.state === 0" text="往返" inverted style='background-color: #e6f4fb;' type="success" size='small'></uni-tag>
						<uni-tag v-else text="单程" type="primary" inverted style='background-color: #e6f4fb;' size='small'></uni-tag>
						
						<uni-tag v-show="a.state === 0" text="已通过" type="success" size='small'></uni-tag>
						<uni-tag v-show="a.state === 1" text="待审核" type="primary" size='small'></uni-tag>
						<uni-tag v-show="a.state === 2" text="审核中" type="warning" size='small'></uni-tag>
						<uni-tag v-show="a.state === 3" text="未通过" type="error" size='small'></uni-tag>
						<uni-tag v-show="a.state === 4" text="已撤销" style='background-color: #888;color: #fff;' type="" size='small'></uni-tag>	
						<uni-icons type="forward"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<w-picker
			:visible.sync="selectorVisible"
			mode="selector"
			value="事假"
			default-type="name"
			:default-props="defaultProps"
			:options="selectorList"
			@confirm="onConfirm($event,'selector')"
			@cancel="onCancel"
			ref="selector" 
		></w-picker>
		
		<w-picker
			:visible.sync="selectorVisible_state"
			mode="selector"
			value="审核中"
			default-type="name"
			:default-props="defaultProps_state"
			:options="selectorList_state"
			@confirm="onConfirm_state($event,'selector')"
			@cancel="onCancel_state"
			ref="selector" 
		></w-picker>
		
		<w-picker
		    :visible.sync="selectorVisible_time"
		    mode="date" 
		    startYear="2017" 
		    endYear="2029"
		    value="2020-03"
		    :current="true"
		    fields="month"
		    @confirm="onConfirm_time($event,'date')"
		    @cancel="onCancel_time"
		    :disabled-after="true"
		    ref="date1" 
		></w-picker>
		
	</MeScroll>
</template>

<script>
	//import {formateDates,getCurrentMonthFirst,getCurrentMonthLast} from "@/common/util.js"
	import MeScroll from '../../components/mescroll-uni/mescroll-uni.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	export default {
		components:{
			MeScroll,wPicker
		},
		props: {
			type: Number,
			i: Number
		},
		data() {
			return {
				datalist:[{
					time: "2021年05月",
					list:[{
						title:"事假",
						starTime:"05月01日",
						endTime:"05月03日",
						state:0,
					},{
						title:"病假",
						starTime:"05月11日",
						endTime:"05月13日",
						state:1,
					},{
						title:"病假",
						starTime:"05月01日",
						endTime:"05月31日",
						state:2,
					},{
						title:"病假",
						starTime:"05月01日",
						endTime:"05月31日",
						state:3,
					},{
						title:"病假",
						starTime:"05月01日",
						endTime:"05月31日",
						state:4,
					}]
				},
				{
					time: "2021年04月",
					list:[{
						title:"事假",
						starTime:"04月01日",
						endTime:"04月03日",
						state:1,
					},{
						title:"病假",
						starTime:"04月11日",
						endTime:"04月13日",
						state:1,
					},{
						title:"事假",
						starTime:"04月01日",
						endTime:"04月31日",
						state:1,
					}]
				},{
					time: "2021年03月",
					list:[{
						title:"事假",
						starTime:"03月01日",
						endTime:"03月03日",
						state:0,
					},{
						title:"病假",
						starTime:"03月11日",
						endTime:"03月13日",
						state:4,
					},{
						title:"事假",
						starTime:"03月01日",
						endTime:"03月31日",
						state:2,
					}]
				},],
				
				result:{
					result:"事假"
				},
				defaultProps:{
					label:"name",
					value:"id"
				},
				selectorList:[
					{
						name:"事假",
						id:"0"
					},{
						name:"调休",
						id:"1"
					},{
						name:"病假",
						id:"2"
					},{
						name:"年假",
						id:"3"
					},{
						name:"产假",
						id:"4"
					},{
						name:"婚假",
						id:"5"
					},{
						name:"哺乳假",
						id:"6"
					}
				],
				selectorVisible:false,
				
				result_state:{
					result:"审核中"
				},
				defaultProps_state:{
					label:"name",
					value:"id"
				},
				selectorList_state:[
					{
						name:"审核中",
						id:"0"
					},{
						name:"已审核",
						id:"1"
					},{
						name:"待审核",
						id:"2"
					},{
						name:"已通过",
						id:"3"
					},{
						name:"已撤销",
						id:"4"
					},
					
				],
				selectorVisible_state:false,
				
				result_time:{
					result:"2020年05月"
				},
				
				
				selectorVisible_time:false,
				
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
                this.extraData = [];
            },
			
			
				
			onConfirm(res,type){
				this.result=res;
				console.log(res)
			},
			onCancel(){
					
			},
			onConfirm_state(res,type){
				this.result=res;
				console.log(res)
			},
			onCancel_state(){
					
			},
			onConfirm_time(res,type){
				this.result=res;
				console.log(res)
			},
			onCancel_time(){
					
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

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.cgray {
		color: gray;
	}
	.basement {
		padding: 10upx 20upx;
		border-bottom: 1px solid #ccc;
	}
	.top_search {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.top_search_nav {
		display: flex;
		align-items: center;
		width: 45%;
	}
	.result {
		margin-right: 20upx;
	}
	.search_select {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	
	.main {
		padding: 10upx 20upx;
	}
	
	
	.dataList {
		display: flex;
		justify-content: space-between;
		margin: 20upx 10upx;
	}
	.dataListRight {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-right: 50upx;
	}
	.dataListLeft {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 300upx;
	}
	
	
	
	.big_time {
		display: inline-block;
		color:#000000;
		margin: 10upx 0;
		font-size: 32upx;
	}
	.dataListTitle {
		font-size: 28upx;
	}
	.dataListTime {
		font-size: 28upx;
		color: #888;
	}
	.line {
		color: #bbb;
	}
</style>
