<template>
  <div class="home_1">
    <div class="bj" style="max-height: max-height: 200px;">
      <img class="bj_img" src="../assets/bj1.png" alt="">
      <div  @click="clickBall" style="cursor: pointer;position: absolute;transition: background-color 0.3s;
top: 20px;
right: 20px;">
          <div style="width: 70px;
height: 27px;
background: #28B27C;
border-radius: 37px;
opacity: 0.55;
display:flex;
justify-content: center;
line-height: 27px;
">
            <div style="color:#fff;width:50%;font-size: 11px;">EN</div>
            <div style="color:#fff;width:50%;font-size: 11px;">ES</div>
          </div>
          <dir ref="ball" style="width: 35px;
height: 27px;
background: #09D082;
border-radius: 37px;
position: absolute;
top:0px;
left:0;
transform: translateX(0em);
line-height: 27px;
text-align: center;
transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05), -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
">
              <div style="font-size:11px;color:#fff;">
                {{ title2 }}
              </div>
            </dir>
        </div>
      <div class="title">
        {{ this.title.ProductName }}
      </div>
      <div class="title2">
        {{ merchantName }}
      </div>
    </div>
    <div class="c3">
      <div class="c3_div1" :class="typeData === 'Bank'?'c3_div1_border':''">
        <div class="c3_div1_circle">
          <van-icon name="success" />
        </div>
        <div>
          {{ this.title.Bank }}
        </div>
      </div>
      <!-- <div class="c3_div1" style="background: #EFEFEF;cursor: not-allowed;opacity: 0.9;" :class="typeData === 'Wallet'?'c3_div1_border':''">
        <div class="c3_div1_circle"></div>
        <div>
          Wallet
        </div>
      </div> -->
    </div>
    <div class="c2" style="margin-top: 45px;">
      <button style="width:72%;" @click="clickFix">
        <img src="../assets/button.png" alt="">
        <span class="span2">{{ this.title.GetClabe }}</span>
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
import { selectMethod } from '../api/payment'
export default {
  data() {
    return {
      typeData: 'Bank',
      selectMethodData: {
        uuid: '',
        selectedMethod: 'OFFLINE'
      },
      showLoading: false,
      progressValue: 0,
      merchantName: '',
      title2: 'EN'
    }
  },
  mounted() {
    this.merchantName = localStorage.getItem('merchantName');
    if (this.title.Amount === 'Cantidad') {
      this.title2 = 'ES'
      this.$refs.ball.style.transform = 'translateX(2.1em)';
    } else {
      this.title2 = 'EN'
      this.$refs.ball.style.transform = 'translateX(0em)';
    }
  },
  methods: {
    clickBall() {
      if (this.$refs.ball.style.transform === 'translateX(2.1em)') {
        this.$refs.ball.style.transform = 'translateX(0em)';
        this.title2 = 'EN'
        this.executeLang('eg')
      } else {
        this.$refs.ball.style.transform = 'translateX(2.1em)';
        this.title2 = 'ES'
        this.executeLang('mxg')
      }
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
        if (res.data.step == 'SUCCESS') {
          this.$router.push({
          name: 'success',
          params: {
            uuid: uuid,
            data: res.data
          }
          })
        } else if (res.data.step == 'EXPIRE') {
          this.$router.push({
          name: 'expire',
          params: {
            uuid: uuid,
            data: res.data
            }
          })
        } else {
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
      }).catch(error =>{
        this.showLoading = false
        this.progressValue = 100;
        clearInterval(timer);
      })
    },
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
.c3 {
  margin-top: 0px;
  .c3_div1 {
    margin: auto;
    // margin-top: 40px;
    width: 75%;
    background: #FFFFFF;
    box-shadow: 0px 2px 16px 0px rgba(150,204,183,0.3);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    .c3_div1_circle {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 2px solid #979797;
      margin-right: 15px;
      line-height: 25px;
      box-sizing: border-box;
      font-size: 20px;
    }
    div {
      font-weight: 800;
      color: #333333;
      font-size: 5vw;
      font-family: PingFangSC-Heavy, PingFang SC;
    }
  }
}
.c3_div1_border {
  border: 1px solid #28B27C;
  .c3_div1_circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #28B27C !important;
    background: #28B27C;
    color: #fff !important;
    margin-right: 15px;
  }
  div {
    color: #28B27C !important;
  }
}
</style>
