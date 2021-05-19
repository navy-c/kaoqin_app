<template>
	<view class="content sign2">
		<view class="page-body">
	        <view class="page-section page-section-gap">
	            <map 
					class="map"  
					@callouttap 
					@controltap="controltap"
					:scale="scale"  
					:controls="controls"
					:latitude="latitude" 
					:longitude="longitude" 
					:circles="circles" 
					:markers="covers" 
				/>
	        </view>
			<view class="text-info">
				<view class="inputV" style="display: flex;justify-content: space-between;">
					<view>我的位置 （<text :class="isTrue ? 'colorBlue' : 'colorRed'">{{signstate}}</text> ）</view>
					<view>精确度:{{accuracy}}</view>
				</view>
				<!-- <view class="inputV">
					<view class="t">当前位置</view>
					<view class="text" @click="openLocation">{{address}}</view>
				</view> -->
				<view class="inputV">
					<view class="t">备注</view>
					<input class="text" type="text" v-model="signInfo.remarks" placeholder="选填备注">
				</view>
				<view class="inputV">
					<button 
						style="color: white;" 
						:class="isTrue === true ? 'bgBlue' : isTrue === false ? 'bgGreen' : isTrue === null ? 'bgAsh' : ''" 
						@click="clickSign"
					>
						{{time}} --- {{signText}}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {handleSignClick,setSignInfo,addSignInfo,getSignInfo,delSignInfo,getInfo,key} from "../index/index.js"
	import {formateDate,pointInsideCircle} from "@/common/util.js"	//时间按格式化
	export default {
		data() {
			return {
				isTrue:null,							//是否在考勤范围内
				signText:"",							//打卡文字
				signstate:"",							//打卡状态
				r : 80,									//半径
				scale:"17",								//缩放
				clickNum:0,								//点击重新获取位置信息次数
				latitude: "",							//当前经度
				longitude: "",							//当前维度
				accuracy:"",
				address:"我的位置",								//公司位置-名称	
				time:formateDate(new Date(),'h:min:s'),	//当前时分秒
				signInfo:{mode:"", latitude:"",longitude:"",address:"",time:"",remarks:""},	//打卡信息 （模式，经纬度，地址，时间 备注）
				covers: [
					// 公司点信息
					{id:0,callout:{content:"南京xxx技术有限公司",display:"ALWAYS",},latitude:13224630.115,longitude:3731905.02,iconPath: '../../static/img/location.png'},
				],
				circles:[
					// 公司圆信息
					{latitude:13224630.115,longitude:3731905.02,radius:80,strokeWidth:1,fillColor:"#7fff0099"},
				],
				controls:[
					// 控件
					{id:0,position:{left:300,top:300,width:32,height:32},iconPath:"../../static/img/resetlo.png",clickable:true}
				],
			}
		},
		onLoad(){
			this.getTime()
			this.getLocation()
		},
		
		methods: {
			// 初始化数据  （公司的经纬度 公司名称 打卡范围 ）
			getData(){
				var that = this;
				var url = ``;
				uni.request({
					url,
					success(res){
						let data = res.data;
						that.covers[0].callout.content = data.name;
						that.covers[0].latitude = that.circles[0].latitude = data.latitude;
						that.covers[0].longitude = that.circles[0].longitude = data.longitude;
						that.r = that.circles.radius = data.r;
					}
				})
			},
			
			// 实时时间
			getTime(){
				var that = this;
				setInterval(function(){
					that.time = formateDate(new Date(),'h:min:s')
				},1000)
			},
			// 点击打卡
			clickSign(){
				
				var isTrue = this.isTrue;
				if(isTrue === null){
					uni.showToast({title:"请检查位置信息状态！",icon:"none", mask:true,duration:3000})
					return;
				}
				
				uni.showLoading({title:"打卡记录中...",mask:true});
				this.signInfo.time = formateDate(new Date(),'Y-M-D h:min:s');
				if(getSignInfo() != undefined){
					addSignInfo(getInfo(this.signInfo),getSignInfo())
				}else{
					setSignInfo(getInfo(this.signInfo))
				}
				setTimeout(function(){
					uni.hideLoading();
					uni.navigateTo({url:"/pages/index/index"})
				},2000)
			},
			// 腾讯位置服务
			getAdd(){
				if(this.isTrue === true){
					let address = this.covers[0].callout.content;
					this.address = address;
					this.signInfo.address = address;
					return;
				}
				var that = this;
				var url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${that.latitude},${that.longitude}&key=${key}`;
				uni.request({
					url,
					success(res){
						var data = res.data;
						if(data.status != 0){
							uni.showToast({title:data.message,icon:"none"})
							return;
						}
						if(that.isTrue === false){
							let address = res.data.result.address + res.data.result.formatted_addresses.recommend
							that.address = address;
							that.signInfo.address = address;
						}
					}
				})
			},
			// 重新获取位置
			controltap(e){
				this.getLocation()
			},
			// 获取当前位置
			getLocation(){
				var that = this;
				if(this.clickNum !== 0){
					uni.showLoading({title:"获取中...",mask:true})
				}
				if(this.clickNum >= 3){
					uni.showToast({title:"请稍后尝试！",icon:"none",mask:true});
					return ;
				}
				this.clickNum++;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success(res) {
						uni.hideLoading();
						that.accuracy = res.accuracy;
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.scale = 17;
						// console.log(res.latitude,"---",res.longitude)
						that.covers[1] = {id:1,latitude:res.latitude,longitude : res.longitude,iconPath: '../../static/img/location.png'}
						
						var s = pointInsideCircle([that.latitude,that.longitude],[that.circles[0].latitude,that.circles[0].longitude],that.r/100000);
						that.isTrue = s;
						that.signstate = s ? "在考勤范围内" : "不再考勤范围内";
						that.signText = s ? "正常打卡" : "外勤打卡";
						
						that.signInfo.latitude = res.latitude;
						that.signInfo.longitude = res.longitude;
						// that.signInfo.address = that.address;
						that.signInfo.mode = s ? "正常打卡" : "外勤打卡";
						// that.signInfo.time = formateDate(new Date,'Y-M-D h:min:s');
						
						
						that.getAdd()
					},
					fail(err){
						uni.hideLoading()
						that.signText = "请检查位置信息";
						uni.showToast({title:"请检查位置信息状态！",icon:"none", mask:true,duration:3000})
					}
				});
			},
			// 选择地址
			openLocation(){
				var that = this;
				uni.chooseLocation({
					success: function (res) {
						that.address = res.address;
						that.signInfo.address = res.address;
						// 这里是有问题的 .返回的 res 中有经纬度，地址名  如果使用这个经纬度 就会存在问题，（当前位置和公司位置重合），所以不建议使用这个经纬度。
						var s = pointInsideCircle([that.latitude,that.longitude],[that.circles[0].latitude,that.circles[0].longitude],that.r/10000);
						that.isTrue = s;
						that.signstate = s ? "在考勤范围内" : "不再考勤范围内";
						that.signText = s ? "正常打卡" : "外勤打卡";
						
					}
				});
			},
		}
	}
</script>

<style>
	uni-page-body{height: 100%;overflow: hidden;width:100%}
	.sign2{width: 100%;height: 100%;}
	/* #ifdef APP-PLUS */
	.sign2{height: 100vh;overflow: hidden;}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.sign2{height: 100vh;overflow: hidden;}
	/* #endif */
	.map{width: 100%; height: 350px;}
	.colorGreen{color: #32CD32;}
	.colorBlue{color:#007aff}
	.colorRed{color:red}
	.bgBlue{background-color: #007aff;}
	.bgGreen{background-color: #32CD32;}
	.bgAsh{background-color: #C8C7CC;}
	.inputV {padding:20upx}
	.inputV .t{font-size:36upx}
	.inputV .text{border-bottom:1px solid #000;width: 100%;color:#666;}
</style>
