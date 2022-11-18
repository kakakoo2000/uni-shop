<template>
  <view class="search-box">
    <uni-search-bar @input="input" placeholder="请输入想要的商品" :radius="100" cancelButton="none"></uni-search-bar>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchList.length !== 0">
      <view class="sugg-item" v-for="(item,i) in searchList" :key="i" @click="goToGoodsList(item)">
        <view class="goods-name">{{item.goods_name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史项 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="15"  @click="delHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag type="arr" :text="item" v-for="(item,i) in history" :key="i" @click="goToGoods(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        searchList:[],
        historyList:[]
      };
    },
    onLoad(){
     this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods:{
      input(e){
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.kw = e
        // console.log(e)
        this.searchrResults()
        },500)
      },
      goToGoods(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + item
        })
      },
      delHistory(){
         this.historyList = []
         uni.removeStorageSync('kw')
      },
      goToGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
     async searchrResults(){
        if(this.kw === ''){
          this.searchList = []
          return
        }
      
      const res = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
      if(res.data.meta.status !== 200) return uni.$showMsg()
      // console.log(res)
      this.searchList = res.data.message
      this.saveSearchHistory()
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        // 搜索关键词重复的问题
        const set = new Set(this.historyList)
        
       console.log(set)
       set.delete(this.kw)
       set.add(this.kw)
       this.historyList = Array.from(set)
       uni.setStorageSync('kw',JSON.stringify(this.historyList))
      }
    },
    computed:{
      history(){
      return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: -2px;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name{
      // 文本不允许换行
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后,使用...代替
      text-overflow: ellipsis;
    }
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #efefef;
    font-size: 15px;
  }
}
.history-list{
  display: flex;
  flex-wrap: wrap;
  .uni-tag{
    margin-top: 5px;
    margin-right: 5px;
  }
}
</style>
