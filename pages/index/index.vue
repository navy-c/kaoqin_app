<template>
	<view class="content">
		<view class="page-body">
			<mainHead/>
			<!-- <text @click="reset">重置</text> -->
			<!-- // 日期时间 -->
			<view class="sign-title-r">
				<view class="date">
					<!-- <picker mode="date" :value="date"  @change="bindDateChange">
						<view class="uni-input">{{date}} <uni-icon type="arrowdown"></uni-icon></view>
					</picker> -->
					<view style="text-align: center;">{{date}}<text style="margin: 0 1em;">{{week}}</text>{{Timer[0].time}} - {{Timer[1].time}}</view>
				</view>
			</view>
			
			<!-- //当前位置 -->
		<!-- 	<view style="text-align: center;padding: 20upx 0;">当前位置: <text @click="openLocation">{{address}}</text></view> -->
			
			<!-- 打卡信息 -->
			<view class="uni-timeline">
				<!-- 上班打卡 -->
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider" :style="{ background : (!isAm ? '#1AAD19' : '#1AAD19')}"></view>
					<view class="uni-timeline-item-content">
						<view >
							<view class="uni-timeline-item-content-t1">上班时间 &nbsp;{{Timer[0].time}}</view>
							<view class="desc-pad mgsBox" v-if="isAm">
								<view class="time uni-timeline-item-content-t iswqbox">
									<!-- <uni-icon type="arrowdown"></uni-icon> -->
									打卡时间 {{(amSign.time).substring(10,16)}}
									<view class="iswq" v-if="amSign.mode == '外勤打卡'">
										<uni-tag text="外勤"  inverted type="success"  size='small'></uni-tag>
									</view>
								</view>
								<view> 
								<!-- <uni-icon type="location-filled"/> -->
								{{amSign.address}}</view>
								<!-- <view class="bz last" @click="showBz('amSign')">
									备注 
									<uni-icon :style="{color:'rgb(0, 122, 255)'}"  type="forward"></uni-icon>
								</view> -->
							</view>
							<view v-else class="content-show">
								<view v-if="is === true">
									<view :class="['module', moduleColor]" @click="clickSign">
											<view class="text">{{moduleTitle}}</view>
											<view class="time">{{time}}</view>
									</view>
									<view class="colorGreen" style="text-align: center;" v-if="is">
										已在考勤范围内 <text class="relocation" @click="relocation">重新定位</text>
									</view>
								</view>
								<view v-else-if="is === false">
									<view class="module CGreen"  @click="clickSign">
										<view class="text">外勤打卡</view>
										<view class="time">{{time}}</view>
									</view>
									<view class="colorRed" style="text-align: center;" v-if="!is">
										不再考勤范围内	<text class="relocation" @click="relocation">重新定位</text>
									</view>
								</view>
								<view v-else-if="is === null">
									<view class="module CAsh">
										<view class="text">定位失败</view>
										<view class="time">{{time}}</view>
									</view>
									<view class="colorRed" style="text-align: center;">
										<text>请检查手机定位服务状态</text>
										<text class="relocation" @click="relocation">刷新</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider" :style="{ background : (isAm ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">下班时间 &nbsp;{{Timer[1].time}}</view>
							<view v-if="isAm" class="desc-pad mgsBox">
								<view class="desc-pad" v-if="isPm">
									<view class="time uni-timeline-item-content-t iswqbox">
										打卡时间:{{(pmSign.time).substring(10,16)}}
										<!-- <view class="iswq" v-if="pmSign.mode == '外勤打卡'">外勤</view> -->
										<view class="iswq" v-if="amSign.mode == '外勤打卡'">
											<uni-tag text="外勤"  inverted type="success"  size='small'></uni-tag>
										</view>
										<view class="iswq" v-if="amSign.mode == '迟到打卡'">
											<uni-tag text="迟到"  inverted type="warning"  size='small'></uni-tag>
										</view>
									</view>
									<view>{{pmSign.address}}</view>
									<!-- <view class="bz last" @click="showBz('pmSign')">
										备注
										 <uni-icon :style="{color:'rgb(0, 122, 255)'}" type="forward" />
									</view> -->
								</view>
								<view v-else class="content-show">
									<view v-if="is === true">
										<view class="module CBlue" @click="clickSign">
											<view class="text">下班打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorGreen" style="text-align: center;" v-if="is">
											已在考勤范围内 <text class="relocation" @click="relocation">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === false">
										<view class="module CGreen"  @click="clickSign">
											<view class="text">外勤打卡</view>
											<view class="time">{{time}}</view>
										</view>
										<view class="colorRed" style="text-align: center;" v-if="!is">
											不再考勤范围内 <text class="relocation" @click="relocation">重新定位</text>
										</view>
									</view>
									<view v-else-if="is === null">
										<view class="module CGreen">
											<view class="text">请检查位置信息</view>
											<view class="time">{{time}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view>
				<uni-collapse >
					<uni-collapse-item title="全部打卡信息">
						<uni-list>
							<view  class="uni-list-cell-left">
								<view v-for="(item,index) in allSign" :key="index" style="border-bottom: 1px dashed #007AFF;">
									<view>{{item.mode}}</view>
									<view>{{item.address}}</view>
									<view>{{item.time}}</view>
								</view>
							</view>
						</uni-list>
					</uni-collapse-item>
				</uni-collapse>
			</view> -->
        </view>
		<!-- 备注 -->
		<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="title" style="padding: 20upx 0;font-weight: bold;width: 100%;text-align: center;border-bottom: 1px solid #666;">打卡备注</view>
			<view class="content" style="padding: 20upx 10upx;width: 100%;">
				<view class="text">打卡时间:</view>
				<view>{{bzText.time}}</view>
				<view class="text">打卡地点:</view>
				<view>{{bzText.address}}</view>
			</view>
			<view class="content" style="padding: 20upx 10upx;width: 100%;">
				<view>{{bzText.remarks}}</view>
			</view>
			<view class="bottom" style="padding: 20upx 10upx;color: cadetblue;width: 100%;text-align: center;border-top: 1px solid #666;" @click="togglePopup('')">关闭</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import mainHead from "@/components/main/main-head.vue"
	import {formateDate,pointInsideCircle ,isSameDay} from "@/common/util.js"	
	import {handleSignClick,setSignInfo,addSignInfo,getSignInfo,delSignInfo,getInfo , key} from "./index.js"
	export default {
		components: {uniIcon,uniPopup,mainHead},
		data() {
			return {
				name:"Navy_c",
				moduleColor: 'CBlue',
				moduleTitle: '上班打卡',
				bzText:{time:"",address:"",img:"",remarks:""},
				type:"",
				achievement:{money:"888.88",num:"1"},			//业绩	
				r : 80,									//半径
				Timer:[{time:"09:00",},{time:"18:00"}],	//上下班时间
				isAm:false,								//上班是否打卡
				isPm:false,								//下班是否打卡
				amSign:{time:"",address:"",remarks:"",img:""},			//上午打卡信息
				pmSign:{time:"",address:"",remarks:"",img:""},			//下午打卡信息
				clickNum:0,								//点击重新获取位置信息次数
				is:null,								//是否正常打卡（外勤打卡）
				isSign:false,							//是否打卡
				time:formateDate(new Date(),'h:min:s'),	//当前时分秒
				date:formateDate(new Date(),'Y-M-D'),
				week:"",						//当前星期几			
				latitude: "",							//当前经度
				longitude: "",							//当前维度
				address:"我的位置",						//
				wqInfo:null,
				allSign:[],								//所有打卡信息		
				organize:'R &amp D department',							//考情组						
				signInfo:{mode:"", latitude:"",longitude:"",address:"",time:"",remarks:""},	//打卡信息 （模式，经纬度，地址，时间）
				covers: [
					// 公司点信息
					{id:0,callout:{content:"南京xxx技术有限公司",color:"red",display:"ALWAYS",},latitude:113224630.115,longitude:1837131905.02,iconPath: '../../../static/img/location.png'},
				],
				circles:[
					// 公司圆信息(latitude:13224630.115,longitude:3731905.02,);
					{latitude:13224630.115,longitude:131731905.02,radius:80,strokeWidth:1,fillColor:"#7fff0099"},
				]
			}
		},
		// 初始化
		onLoad() {
			var sign = getSignInfo();
			if(sign != undefined){
				var signA = sign.main.reverse();
				this.allSign = signA
				if(signA.length == 1){
					if(isSameDay(signA[0].nowT)){
						this.isSign = true;
						this.isAm = true;
						this.allSign = signA
						this.amSign = signA[0];
					}
				}else{
					// 理想状态 认为这是 上一天 的 下班信息
						if(signA[0]){
							if(isSameDay(signA[0].nowT)){
								this.isSign = true;
								this.isPm = true;
								this.allSign = signA;
								this.pmSign = signA[0];
							}
						}
						// 理想状态 认为这是 上一天 的 上班信息
						if(signA[1]){
							if(isSameDay(signA[1].nowT)){
								this.isSign = true;
								this.isAm = true;
								this.allSign = signA
								this.amSign = signA[1];
							}
						}
					}
				}
			this.getLocation();
			this.getTime();
			this.getWeekDate();
			
		},
		methods: {
			getWeekDate() {
						      var now = new Date();
						      var day = now.getDay();
						      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
						      this.week = weeks[day];
							  console.log(this.week);
						   },
			togglePopup(type) {
				this.type = type;
			},
			// 产看规则
			goRule(){
				uni.navigateTo({url:"/pages/rule/rule"})
			},
			// 腾讯位置服务
			getAdd(){
				if(this.isAm && this.isPm){
					return;
				}
				if(this.is === true){
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
						if(that.is === null){
							that.address = "请检查位置信息！";
						}
						if(that.is === false){
							let address = res.data.result.address + res.data.result.formatted_addresses.recommend
							that.address = address;
							that.signInfo.address = address;
						}
					}
				})
			},
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
			// 重新定位
			relocation(){
				this.getLocation();
				// uni.navigateTo({url:"/pages/sign/sign",})
			}, 
			// 选择打卡日期
			bindDateChange: function(e) {
				this.date = e.target.value
			},	
			// 重置打卡
			reset(){
				var that = this;
				uni.showModal({
					title:"重置本地打卡信息",
					content:"您确定要重置打卡信息吗？点击确定本地打卡信息会被清除！",
					success: function (res) {
						if (res.confirm) {
							delSignInfo();
							that.isSign = false;
							that.isAm = false;
							that.isPm = false;
							that.allSign = [];
						} else if (res.cancel) {
							return;
						}
					}
				})
				
			},
			// 显示备注
			showBz(type){
				this.type = 'middle-list';
				if(type == 'amSign'){
					this.bzText.time = this.amSign.time;
					this.bzText.address = this.amSign.address;
					this.bzText.remarks = this.amSign.remarks;
				}else if(type == 'pmSign'){
					this.bzText.time = this.pmSign.time;
					this.bzText.address = this.pmSign.address;
					this.bzText.remarks = this.pmSign.remarks;
				}
			},
			
			// 实时时间
			getTime(){
				var that = this;
				setInterval(function(){
					that.time = formateDate(new Date(),'h:min:s')
				},1000)
			},
			// 获取当前位置
			getLocation(){
				var that = this;
				let setTime = this.Timer[0].time.replace(/:/g,'')
				let getTime = this.time.replace(/:/g,'').substring(0,4)
				if(setTime < getTime){
					this.moduleColor =  'CYellow'
					this.moduleTitle = '迟到打卡'
				}
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
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						//test    13224630.115,longitude:3731905.02
						that.latitude = 13224630.115; 
						that.longitude = 132731905.02;
						// console.log(res.latitude,"---",res.longitude)
						that.covers[1] = {id:1,latitude:res.latitude,longitude : res.longitude,iconPath: '../../static/location.png'}
						var s = pointInsideCircle([that.latitude,that.longitude],[that.circles[0].latitude,that.circles[0].longitude],that.r/100000);
						
						
						that.is = s;
						that.signInfo.latitude = res.latitude;
						that.signInfo.longitude = res.longitude;
						that.signInfo.mode = s ? "正常打卡" : "外勤打卡";
						
						that.getAdd()
					},
					fail(err){
						uni.hideLoading();
						that.address = "请检查位置信息"
						uni.showToast({title:"请检查位置信息状态！",icon:"none", mask:true,duration:3000})
					}
				});
			},
			// 点击打卡
			clickSign(){
				var that = this;
				var isTrue = this.is;
				if(isTrue === null){
					uni.showToast({title:"请检查位置信息状态！",icon:"none", mask:true,duration:3000})
					return;
				}
				this.getLocation() //再次获取数据
				uni.showLoading({title:"打卡记录中...",mask:true});
				this.signInfo.time = formateDate(new Date(),'Y-M-D h:min:s');
				var a = getSignInfo();
				if(a != undefined){
					addSignInfo(getInfo(this.signInfo),a)
				}else{
					setSignInfo(getInfo(this.signInfo))
				}
				setTimeout(function(){
					uni.hideLoading();
					var sign = getSignInfo().main;
					that.allSign = sign.reverse();
					that.isSign = true;
					
					console.log(that.allSign,999);
					if(that.isAm === false){
						that.isAm = true;
						that.amSign = that.allSign[0];
					}else{
						that.isPm = true;
						that.pmSign = that.allSign[1];
					}
					uni.showToast({title:"打卡成功！"})
				},200)
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
						that.is = s;
					}
				});
			},
			// getStorageSize:function(){
			// 			let that = this;
			// 			uni.getStorageInfo({
			// 				success(res) {
			// 					//console.log(res.keys);
			// 					//console.log(res.limitSize);
			// 					let size = res.currentSize;
			// 					if (size < 1024) {
			// 						that.storageSize = size + ' B';
			// 					} else if (size/1024>=1 && size/1024/1024<1) {
			// 						that.storageSize = Math.floor(size/1024*100)/100 + ' KB';
			// 					} else if (size/1024/1024>=1) {
			// 						that.storageSize = Math.floor(size/1024/1024*100)/100 + ' M';
			// 					}
			// 				}
			// 			})
			// 		},
			// 		clearStorage:function (){
			// 			let that = this;
			// 			uni.showModal({
			// 				title:'提示',
			// 				content:'确定清除缓存吗?',
			// 				confirmText:'立即清除',
			// 				success(res) {
			// 					if(res.confirm){
			// 						uni.clearStorageSync();
			// 						//重新获取并显示清除后的缓存大小
			// 						that.getStorageSize();
			// 						uni.showToast({
			// 							title:'清除成功'
			// 						})
			// 					}
			// 				}
			// 			})
			// 		}
		},
	}
</script>

<style>
	.map{width: 100%; height: 260px;}
	.uni-list-cell-left {padding: 0 30upx;}
	.text-desc{display: flex;justify-content: space-between;padding:10upx 20upx}
	.colorRed{color: red;}
	.colorGreen{color: #32CD32;}
	.colorYellow{color: yellow;}
	.colorBlue{color: #007aff;}
	
	.bgBlue{background-color: #007aff;}
	.bgGreen{background-color: #32CD32;}
	.bgAsh{background-color: #C8C7CC;}
	
	.uni-timeline{padding: 30upx 20upx;}
	.uni-timeline-item-content-t{font-weight: bold;}
	.desc-pad{padding: 0 0upx}
	.desc-pad .bz{color: rgb(0, 122, 255);}
	.desc-pad .bz .icon{color:rgb(0, 122, 255)}
	.uni-timeline-last-item .uni-timeline-item-divider{background: #bbb;}
	.CBlue{background-color: #007aff;box-shadow: 0 3px 3px #007aff;}
	.CGreen{background-color: #32CD32;box-shadow: 0 3px 3px #32CD32;}
	.CYellow{background-color: #FFA500;box-shadow: 0 3px 3px #FFA500;}
	.CAsh{background-color: #C8C7CC;box-shadow: 0 3px 3px #C8C7CC;}
	.module{overflow: hidden; margin: 20upx auto; width: 220upx;height: 220upx;border-radius: 50%;color: #fff;text-align: center;}
	.module .text{font-size: 20px;margin: 50upx auto 10upx;}
	.uni-timeline-item .uni-timeline-item-content{width: 100%;padding-right: 20upx;}
	
	.content-show{width:100%}
	
	
	
	.mgsBox {
		padding: 20upx;
		margin-bottom: 30upx;
		border-radius: 8upx;
		background-color: #f1f1f1;
	}
	.iswqbox {
		display: flex;
		align-items: center;
	}
	.iswq {
		width: 100upx;
		margin-left: 10upx;
	}
</style>
