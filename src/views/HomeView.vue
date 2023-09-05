<template>
  <div class="home_1">
    <div class="bj">
      <img class="bj_img" src="../assets/bj1.png" alt="">
      <div class="title">
        Product Name
      </div>
      <div class="title2">
        {{ initData.merchantName }}
      </div>
    </div>
    <div class="c1">
      <img src="../assets/div1.png" alt="">
      <span>
        {{ initData.amount |currency }}
      </span>
      <div>Amount</div>
    </div>
    <div class="c3">
      <div v-if="SPEIBankShow" class="c2_div1" :class="selectMethodData.selectedMethod === 'SPEI'?'c2_div_border':''" @click="selectMethodData.selectedMethod = 'SPEI'">
        <img style="width:54px;margin-top: -7px;margin-left: -7px;" src="../assets/clabe.png" alt="">
        <span>Clabe</span>
      </div>
      <div v-if="OFFLINEShow" class="c2_div1" :class="selectMethodData.selectedMethod === 'OFFLINE'?'c2_div_border':''" @click="selectMethodData.selectedMethod = 'OFFLINE'">
        <img style="width:32px;" src="../assets/cash.png" alt=""> <br>
        <span>Cash</span>
      </div>
    </div>
    <div class="c2" style="margin-top: 30%;">
      <button v-if="selectMethodData.selectedMethod === 'SPEI'" style="width:60%;" @click="clickFix">
        <img src="../assets/button.png" alt="">
        <span class="span2">Get Clabe</span>
      </button>
      <button v-else style="width:60%;" @click="clickFix2">
        <img src="../assets/button.png" alt="">
        <span class="span2">Next</span>
      </button>
    </div>
    <van-popup 
      v-model="showLoading" 
      round
      :close-on-popstate="true"
      :close-on-click-overlay="false"
    >
      <div style="position: absolute;
      left: 50%;
      top: 50%;
      font-size:16px;
      transform: translate(-50%,-50%);">{{progressValue}}%</div>
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getCheckout, selectMethod } from '../api/payment'
export default {
  data() {
    return {
      initData: {},
      PayType: 0,
      selectMethodData: {
        uuid: '',
        selectedMethod: 'SPEI'
      },
      showLoading: false,
      progressValue: 0,
      SPEIBankShow: false,
      OFFLINEShow: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.showLoading = true;
      let second = 0;
      const timer = setInterval(() => {
        second++;
        if (second <= 99) {
          this.progressValue = second;
        } else {
          clearInterval(timer);
        }
      }, 80);
      let uuid = this.uuid
      if (uuid == null || uuid == undefined || uuid == '') {
        uuid = this.$route.query.uuid
      }
      getCheckout(uuid).then(res => {
        this.initData = res.data
        this.showLoading = false
        localStorage.setItem('merchantName', res.data.merchantName);
        this.progressValue = 100;
        clearInterval(timer);
        if (this.initData.step == 'SUCCESS') {
          this.$router.push({
            name: 'success',
            params: {
              uuid: uuid,
              data: res.data
            },
            query: {
              uuid: uuid
            }
          })
        }
        if (this.initData.step == 'EXPIRE') {
          this.$router.push({
            name: 'expire',
            params: {
              uuid: uuid,
              data: res.data
            },
            query: {
              uuid: uuid
            }
          })
        }
        if (this.initData.step == 'TO_PAY') {
          this.$router.push({
            name: 'clabe',
            params: {
              uuid: uuid,
              data: res.data
            },
            query: {
              uuid: uuid
            }
          })
        }
        if (this.initData.supportMethods.length === 2) {
          this.SPEIBankShow = true
          this.OFFLINEShow = true
          this.selectMethodData.selectedMethod = 'SPEI'
        } else {
          console.log(this.initData.supportMethods.length);
          for (let index = 0; index < this.initData.supportMethods.length; index++) {
            if (this.initData.supportMethods[index].method === 'OFFLINE') {
              this.OFFLINEShow = true
              this.selectMethodData.selectedMethod = 'OFFLINE'
            } else if (this.initData.supportMethods[index].method === 'SPEI') {
              this.SPEIBankShow = true
              this.selectMethodData.selectedMethod = 'SPEI'
            }
          }
        }
      }).catch(error =>{
        console.log(error);
        this.showLoading = false
        this.progressValue = 100;
        clearInterval(timer);
      })
    },
    clickFix() {
      this.showLoading = true;
      let second = 0;
      const timer = setInterval(() => {
        second++;
        if (second <= 99) {
          this.progressValue = second;
        } else {
          clearInterval(timer);
        }
      }, 80);

      let uuid = this.uuid
      if (uuid == null || uuid == undefined || uuid == '') {
        uuid = this.$route.query.uuid
      }
      this.selectMethodData.uuid = uuid
      selectMethod(this.selectMethodData).then(res=> {
        this.showLoading = false
        this.progressValue = 100;
        clearInterval(timer);
        this.$router.push({
          name: 'clabe',
          params: {
            uuid: uuid,
            data: res.data
          },
          query: {
            uuid: uuid
          }
        })
      }).catch(error =>{
        this.showLoading = false
        this.progressValue = 100;
        clearInterval(timer);
      })
    },
    clickFix2() {
      let uuid = this.uuid
      if (uuid == null || uuid == undefined || uuid == '') {
        uuid = this.$route.query.uuid
      }
      this.$router.push({
        name: 'cash',
        params: {
          uuid: uuid,
          data: this.initData
        },
        query: {
          uuid: uuid
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bj {
  position: relative;
  max-height: 270px;
  overflow: hidden;
}
.bj_img {
  width: 100%;
    margin-top: -35px;
}
.title {
  position: absolute;
  z-index: 2;
  top: 44%;
  left: 50%;
  color: #28B27C;
  line-height: 20px;
  font-size: 3.7vw;
}
.title2 {
  position: absolute;
  z-index: 2;
  top: 57%;
  left: 50%;
  color: #28B27C;
  line-height: 20px;
  font-weight: 900;
  font-size: 5.7vw;
}
.c1 {
  position: relative;
  text-align: center;
  img {
    width: 95%;
  }
  div {
    position: absolute;
    top: -20px;
    left: 7.5%;
    font-size: 4vw;
    font-weight: 400;
    color: #999999;
  }
  span {
    position: absolute;
    z-index: 1;
    left: 13%;
    top: 45%;
    transform: translateY(-50%);
    font-weight: 800;
    color: #333333;
    font-size: 5vw;
    font-family: PingFang-SC-Heavy, PingFang-SC;
  }
}
.c2 {
  display: flex;
  justify-content: center;
  button {
    position: relative;
    width: 47%;
    align-items: center;
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
.c3 {
  width: 88%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  .c2_div_border {
    border: 2px solid #28B27C;
  }
  .c2_div1 {
    width: 46%;
    background: #FFFFFF;
    box-shadow: 0px 2px 16px 0px rgba(150,204,183,0.2);
    border-radius: 12px;
    box-sizing: border-box;
    text-align: left;
    padding: 10px;
    display: flex;
    height: 80px;
    flex-direction: column;
    img {
      width: 40px;
    }
    span {
      margin-top: auto;
      font-weight: 800;
      color: #333333;
      font-size: 4vw;
      font-family: PingFang-SC-Heavy, PingFang-SC;
    }
  }
}
</style>
