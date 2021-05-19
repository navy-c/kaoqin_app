<template>
	<view class="empty-container">
		<view class="empty-line" ref="left-line-dom">
			
		</view>
		
		<view class="empty-words" v-if="isHasWords">
			<slot>
				<view>
					暂无数据
				</view>
				<view>
					请在右上角添加
				</view>
			</slot>
		</view>
		
		<view class="empty-line" ref="right-line-dom">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			this.$refs['left-line-dom'].$el.style.backgroundColor = this.lineColor
			this.$refs['right-line-dom'].$el.style.backgroundColor = this.lineColor
		},
		props: {
			isHasWords: {
				type: Boolean,
				default: true
			},
			lineColor: {
				type: String,
				default: '#DCDFE6'
			}
		}
	}
</script>

<style scoped>
	.empty-container{
		display: flex;
		font-size: 14px;
		align-items: center;
	}
	.empty-line{
		width: 100%;
		height: 1px;
	}
	.empty-words{
		flex-shrink: 0;
		text-align: center;
		color: #909399;
		font-size: 12px;
	}
</style>
