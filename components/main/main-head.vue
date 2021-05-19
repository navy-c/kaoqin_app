<template>
	<view class="sign-title">
		<view class="sign-title-l">
			<text class="navTitle">考勤南京</text>
			<view class="text">
				<view class="name">
					{{name}}
				</view>
				<!-- <view class="gz" @click="goRule">
					<text class="t1">考勤组:公司考勤</text>
					<text>查看规则</text>
				</view> -->
				<view>
					<text class="t1" style="font-size: 38upx;">考勤组 : {{organize}}</text>
				</view>
				
				<view class="achievement">
					<text class="t1" >昨日收入 : {{achievement.money}} 元</text>
					<text class="t1" >收入排名 : {{achievement.num}} </text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"Navy_c",
				moduleTitle: '上班打卡',
				Timer:[{time:"09:00",},{time:"18:00"}],	//上下班时间
				achievement:{money:"888.88",num:"1"},			//业绩	
				organize:'R &amp D department',							//考情组		
			};
		}
	}
</script>

<style >
.navTitle {visibility: hidden;}
.sign-title{display: flex;justify-content: space-between; }
	.sign-title .portrait{width: 100upx;height: 100upx;line-height: 100upx;border-radius: 50%;background-color: #007AFF;color: #fff;font-size: 28upx;text-align: center;}
	
	.sign-title .sign-title-l{text-align: center;color: #fff;
	background: url(../../static/bg.jpg) no-repeat;
	background-size: 100% 100%;
	flex: 1; margin-bottom: 26upx;}
	.sign-title .sign-title-l .text{margin-left: 20upx;}
	.sign-title .sign-title-l .text .name{font-size: 38upx;}
	.sign-title .sign-title-l .text  .gz{color: darkblue;display: inline-flex;}
	.sign-title .sign-title-l .text .gz text{display: inline-block;}
	.sign-title .sign-title-l .text .gz .t1{font-size: 38upx;color: #000000;}
	.sign-title .sign-title-l .achievement{margin-bottom: 100upx;margin-top: 60upx;}
	.sign-title .sign-title-l .achievement .t1{display: block;}
	.iswq{padding:0 12upx;color: #99CC33;border: 1px solid #99CC33;border-radius: 4px;margin-left: 20upx;display: inline-block;box-sizing: border-box;}
	/* .desc-pad .last{margin-bottom:80upx;} */
	.relocation{color: #0000FF;}
	.uni-popup .content .text{color:#666666;}
</style>
