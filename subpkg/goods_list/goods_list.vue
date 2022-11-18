<template>
 <view >
   <view class="goods-list">
     <view v-for="(item,i) in goodslist" :key="i" @click="goToDetail(item)">
      <my-goods :item="item"></my-goods>
     </view>
   </view>
 </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodslist:[],
        total:0,
        isLoading:false
      };
    },
    onLoad(options){
      this.queryObj.query = options.query || '',
      this.queryObj.cid = options.cid || ''
      // console.log(this.queryObj)
      this.getDoodsList()
    },
    methods:{
    async getDoodsList(cb){
      this.isLoading = true
       const res = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       this.isLoading = false
       cb && cb()
       if(res.data.meta.status !== 200) return uni.$showMsg()
       this.total = res.data.message.total
       this.goodslist = [...this.goodslist,...res.data.message.goods]
      },
      goToDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    onReachBottom(){
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕...')
      if(this.isLoading) return
      // 让页码值加1
      this.queryObj.pagenum += 1
      this.getDoodsList()
    },
    onPullDownRefresh(){
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodslist = []
      this.getDoodsList(()=> uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
</style>
