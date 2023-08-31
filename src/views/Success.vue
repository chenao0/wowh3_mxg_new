<template>
  <div class="home_1">
    <div class="bj">
      <img class="bj_img" src="../assets/bj2.png" alt="">
      <div class="title">
        Transfer Successful
      </div>
    </div>
    <div class="c1">
      <img src="../assets/div2.png" alt="">
      <span>
        Amount
        <div class="div1">
            {{ order.data.amount |currency }}
        </div>
      </span>
    </div>
    <div class="c1">
      <img src="../assets/div2.png" alt="">
      <span>
        Transfer Time:
        <div class="div1">
            {{ order.data.createTime }}
        </div>
      </span>
    </div>
    <div class="c1">
      <img src="../assets/div2.png" alt="">
      <span>
        Arrival Time:
        <div class="div1">
            {{ order.data.succeedTime }}
        </div>
      </span>
    </div>
    <div class="c1">
      <img src="../assets/div2.png" alt="">
      <span>
        Reff ID:
        <div class="div1">
            {{ order.data.merchantReferenceId }}
        </div>
      </span>
    </div>
    <div class="c1">
      <img src="../assets/div2.png" alt="">
      <span>
        Payment Method:
        <div class="div1">
            {{ order.data.selectedMethod }}
        </div>
      </span>
    </div>
    <!-- <div class="c4" style="margin-top: 5px;">
      <button style="width:60%;">
        <img src="../assets/button.png" alt="">
        <span class="span2">Return</span>
      </button>
    </div> -->
  </div>
</template>

<script>
import { getCheckout } from '../api/payment'
export default {
  props: ['uuid', 'data'],
  data() {
    return {
      order: {
        data: {}
      }
    }
  },
  created() {
    if (this.uuid == null || this.uuid == undefined) {
      this.init()
    } else {
      this.order = {
        uuid: this.uuid,
        data: this.data
      }
    }
  },
  methods: {
    init() {
      let uuid = this.uuid
      if (uuid == null || uuid == undefined || uuid == '') {
        uuid = this.$route.query.uuid
      }
      getCheckout(uuid).then(res => {
        this.order.data = res.data
      }).catch(error =>{
        console.log(error);
      })
    },
  }
}
</script>

<style lang="less" scoped>
.bj {
  position: relative;
  .bj_img {
    width: 100%;
  }
  .title {
    position: absolute;
    z-index: 2;
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 700;
    color: #28B27C;
    line-height: 28px;
    font-size: 5vw;
  }
}
.c1 {
  position: relative;
  text-align: center;
  margin-top: -15px;
  img {
    width: 95%;
    // height: 80px;
  }
  span {
    position: absolute;
    width: 78%;
    z-index: 1;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 400;
    color: #666666;
    font-size: 4.2vw;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .div1 {
        font-weight: 600;
        color: #333333;
    }
  }
}
.c4 {
  display: flex;
  justify-content: center;
  button {
    position: relative;
    width: 47%;
    align-items: center;
    // padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 100%;
    }
    span {
      position: absolute;
      z-index: 1;
      left: 18%;
      top: 50%;
      font-weight: 800;
      color: #333333;
      font-size: 4vw;
      font-family: PingFang-SC-Heavy, PingFang-SC;
    }
    .span2 {
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
    }
  }
}
</style>
