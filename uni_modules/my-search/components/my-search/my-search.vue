<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}"  @click="goToSearchHandle">
    <view class="my-search-box"  :style="{'border-radius':radius + 'px'}">
      <!-- 使用Uni-ui的组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>
<script>
  export default{
    props:{
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    methods:{
      goToSearchHandle(){
        this.$emit('click')
      }
    }
  }
</script>
<style lang="scss">
  .my-search-container{
    height: 50px;
    // background-color: #C00000;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .my-search-box{
      height: 36px;
      background-color: #FFFFFF;
      // border-radius: 18px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text{
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
