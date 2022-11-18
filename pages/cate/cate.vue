<template>
  <view>
    <view class="search-box">
      <my-search @click="goToSearch"></my-search>
    </view>
    <view class="view-scoll-container">
      <scroll-view class="left" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['scroll-view-item',i === active ? 'active' : '']" @click="changeCate(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
       <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
         <!-- //二级分类的标题 -->
         <view class="cate-lv2-title">
           /{{item2.cat_name}}/
         </view>
         <!-- 二级分类下的三级列表 -->
         <view class="cate-lv3-list">
           <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="goToGoodsList(item3)">
             <image :src="item3.cat_icon.replace('dev','web')"></image>
             <span>{{item3.cat_name}}</span>
           </view>
         </view>
       </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh : 0,
        cateList:[],
        active:0,
        cateLevel2 :[],
        scrollTop:0
      };
    },
    onLoad(){
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods:{
     async getCateList(){
        const res = await uni.$http.get('/api/public/v1/categories')
        // console.log(res)
        if(res.statusCode !== 200) return uni.$showMsg()
        this.cateList = res.data.message
        //为二级分类复制
        this.cateLevel2 = res.data.message[0].children
      },
      goToSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      },
      goToGoodsList(item3){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      changeCate(i){
        this.active = i
        //重新为二级分类赋值
        this.cateLevel2 =this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      }
    }
  }
</script>

<style lang="scss">
 .view-scoll-container{
   display: flex;
 }
 .left{
   width: 120px;
 }
 .scroll-view-item{
   text-align: center;
   line-height: 60px;
   background-color: #F7F7F7;
   font-size: 12px;
   position: relative;
   &.active{
     background-color: #FFFFFF;
     &::before{
       content: ' ';
       width: 3px;
       height: 30px;
       background-color: #C00000;
       display: block;
       position: absolute;
       top: 50%;
       left: 0;
       transform: translateY(-50%);
     }
   }
 }
 .cate-lv2-title{
   font-size: 12px;
   font-weight: bold;
   text-align: center;
   padding: 15px 0;
 }
 .cate-lv3-list{
   display: flex;
   flex-wrap: wrap;
   .cate-lv3-item{
     width: 33.33%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin-bottom: 10px;
     image{
       width: 70px;
       height: 70px;
     }
     span{
       font-size: 12px;
     }
   }
 }
.search-box{
  position: sticky;
  top: -2px;
  z-index: 999;
}
</style>
