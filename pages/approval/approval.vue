<template>
	<view class="page">
		
		<qsTab
		ref="tabs" 
		:tabs="tabs" 
		animationMode="line1" 
		:current="current"
		:minWidth='375'
		 @change="tabChange"
		swiperWidth="750">
		</qsTab>
		<view class="serchNav">
		<!-- <uni-search-bar style="flex: 1;" @confirm="search" @input="input" cancelButton= 'false'></uni-search-bar> -->
		 <uni-search-bar style="flex: 1;" cancelButton= 'false'></uni-search-bar>
		 <uni-icons type="settings" color="#aaa" size="35" @click="showDrawer"></uni-icons>
		 
		</view>
		 <indexList :i="index" :type="current"></indexList>
		<swiper class="swiper" :current="current"  @change="swiperChange" 
		@transition="transition"
		@animationfinish="animationfinish">
			<swiper-item class="swiper-item" @transition="transition" v-for="(item, index) in tabs" :key="index">
				<!-- <indexList :i="index" :type="current"></indexList> -->
				
				<!-- <view v-show="current === 1">
					<indexList :i="index" :type="current"></indexList>
				</view> -->
			</swiper-item>
		</swiper>
		
		
		<uni-drawer ref="showRight" mode="right" :mask-click="true">
            <scroll-view style="height: 100%;" scroll-y="true">
                <button @click="closeDrawer"  type="primary" style="border-radius: 0;">筛选</button>
				
              <uni-list>
                  <uni-list-item  v-for="(item, index) in questionType" :key="index" :show-badge="true" badgeType="error" :max-num="true" :badge-text="item.num" :title="item.title" showArrow="true" clickable="true"  @click="onClick($event,1)" ></uni-list-item>
              </uni-list>
			 
            </scroll-view>
        </uni-drawer>
		
	</view>
</template>

<script>
	import indexList from './list.vue'
	import qsTab from '../../components/QS-tabs/QS-tabs.vue'
	
	export default {
		components: {
			qsTab,
			indexList
		},
		data() {
			return {
				current: 0,
				tabs: [
					{name: '待处理'},
					{name: '已处理'}
				],
				questionType:[{
					title:"出差",
					num:"10"
				},{
					title:"请假",
					num:"10"
				},{
					title:"外出",
					num:"8"
				},{
					title:"打卡异常",
					num:"18"
				},]
				
				
			}
		},
		methods:{
			swiperChange(e) {
				this.current = e.detail.current
			},
			
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: { current }}) {
				this.$refs.tabs.setFinishCurrent(current);
				// this.swiperCurrent = current;
				this.current = current;
			},
			/**
			 * 选显卡切换
			 * */
			tabChange(index) {
				this.current = index
			},
			showDrawer() {
                this.$refs.showRight.open();
            },
            closeDrawer() {
                this.$refs.showRight.close();
            }
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.serchNav {
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
	}
	.swiper {
		/* position: absolute; */
		width: 100%;
		height: 100%;
		
	}
	.swiper-item {
		width: 100%;
		height: 100%;
	}
	/deep/ .uni-searchbar {
		padding-left: 0;
		margin: 0;
	}
</style>