<template>
  <div class="home_1">
    <div class="bj">
      <img class="bj_img" src="../assets/bj1.png" alt="">
      <div class="title">
        Product Name
      </div>
      <div class="title2">
        {{ order.data.merchantName }}
      </div>
    </div>
    <div class="c1">
      <img src="../assets/div1.png" alt="">
      <span>
        {{ order.data.va }}
        <img :data-clipboard-text="order.data.va" class="tag-read" @click="copy" style="width:4vw;" src="../assets/copy.png" alt="">
      </span>
      <div>Clabe</div>
    </div>
    <div class="c2" @click="hintShow = true,clickHintShow()">
      <img src="../assets/right.png" alt="">
      How to pay ?
    </div>
    <div class="c3">
      <img src="../assets/await.png" alt="">
      <div>
        Not received.
      </div>
    </div>
    <div class="c4" style="margin-top: 55px;">
      <button style="width:60%;" @click="Refresh">
        <img src="../assets/button.png" alt="">
        <span class="span2">Refresh</span>
      </button>
    </div>
    <div class="tishi">
      <van-popup
        v-model="hintShow"
        closeable
        round
        close-icon="close"
        position="bottom"
        :style="{ height: '70%' }"
      >
        <div class="hint" v-if="order.data.selectedMethod === 'OFFLINE'">
          <div v-if="xuanzhongShow" class="content12">
            <div @click="xuanze2()" style="
  display: flex;
  width: 85%;background: #FFFFFF;margin:auto;
  justify-content: space-between;height:46px;border: 1px solid #28B27C;padding: 10px;box-sizing: border-box;border-radius: 4px;">
            <div style="display: flex;align-items: center;">
              <div>
                <img src="../assets/icon3.png" alt="">
              </div>
              <div style="width:28px;height:28px;margin-left:15px;">
                <img style="width: 100%;" :src="xuanzhongWay.logoUrl" alt="">
              </div>
              <div style="text-align: left;margin-left:15px;font-size: 12px;color:#343434;font-weight: 600;font-family: PingFangSC-Semibold, PingFang SC;">
                {{ xuanzhongWay.subject }}
              </div>
            </div>
            <div style="padding-right: 10px;display: flex;align-items: center;">
              <img src="../assets/icon4.png" alt="">
            </div>
          </div>
          <div v-if="xuanzhongWay.content" style="width: 186px;height: 36px;margin: 15px auto;background: #FFFFFF;border-radius: 4px;border: 1px solid #28B27C;padding: 10px;box-sizing: border-box;line-height: 15px;">
            <!-- <span>N.º de asociación </span><br> -->
            {{ xuanzhongWay.content }}
          </div>
          <div @click="tiaozhuan" style="font-size: 20px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #28B27C;margin-top: 35px;">
            Puntos de pago >
          </div>
          </div>
          <div class="content11" v-else>
            <div v-for="(item, index) in order.data.methodGuideVos" :key="index"  @click="ClickWay(item)" class="content11_div" style="display: flex;align-items: center;">
              <img style="width:40px;" :src="item.logoUrl" alt="">
              <span style="text-align: left;margin-left: 10px;text-align: left;">{{ item.subject }}</span>
            </div>
          </div>
        </div>
        <div class="hint" v-else>
          <img style="width: 80%;padding-bottom: 20px;" src="../assets/hint.png" alt="">
            <div v-for="(item, index) in boldInstructions" :key="index" style="word-break: break-all;text-align: left;white-space: pre-wrap;line-height: 36px;">
              <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">{{ index+1 }}. </span>
              <span style="font-size:3.7vw;" v-html="item"></span>
            </div>
        </div>
      </van-popup>
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
import { getCheckout } from '../api/payment'
import Clipboard from 'clipboard'
import { Toast } from 'vant';
export default {
  props: ['uuid', 'data'],
  data() {
    return {
      hintShow: false,
      selectedValue: {},
      text: 'Selecciona "transferencia rapida" Ingresa la CLABE numerica de 18digitos(640180503400000212).',
      order: {
        data: {}
      },
      showLoading: false,
      progressValue: 0,
      textData: [],
      boldInstructions: [],
      xuanzhongWay: {},
      xuanzhongShow: true,
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
      if (this.order.data.selectedMethod === 'OFFLINE') {
        this.xuanzhongWay = {
          logoUrl: this.order.data.methodGuideVos[0].logoUrl,
          content: this.order.data.methodGuideVos[0].content,
          subject:  this.order.data.methodGuideVos[0].subject
        }
      }
    }
  },
  methods: {
    tiaozhuan() {
      var data = 'https://www.paycashglobal.com/buscador.php'
      window.open(data, '_blank');
    },
    xuanze2() {
      console.log('执行');
      this.xuanzhongShow = false
    },
    ClickWay(e) {
      this.xuanzhongWay = e
      this.xuanzhongShow = true
    },
    clickHintShow() {
      if (this.order.data.methodGuideVos) {
        const steps = this.order.data.methodGuideVos[0].content.split('\n').map((line) => {
            const [title, content] = line.split('. ');
            const id = Number(title.match(/\d+/)[0]);
            const formattedTitle = `${id}.`;
            return { title: formattedTitle, text: content };
          });
          this.textData = steps
          this.boldInstructions = steps.map((instruction) => {
            const regex = /\((.*?)\)/g;
            const matchedText = instruction.text.match(regex);
            if (matchedText && matchedText.length > 0) {
              const firstMatch = matchedText[0];
              const boldText = `<strong> ${firstMatch}</strong>`;
              const modifiedText = instruction.text.replace(firstMatch, boldText);
              return modifiedText;
            }

            return instruction.text;
          });
      } else {
        this.init()
      }
    },
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', function() {
          Toast('Copy successful.')
      });
      clipboard.on('error', function() {
          Toast('Copy failed.');
      });
    },
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
        if (res.data.step == 'SUCCESS') {
          this.$router.push({
          name: 'success',
          params: {
            uuid: uuid,
            data: res.data
          }
          })
        }
        if (res.data.step == 'EXPIRE') {
          this.$router.push({
          name: 'expire',
          params: {
            uuid: uuid,
            data: res.data
            }
          })
        }
        this.order.data = res.data
        if (this.order.data.selectedMethod === 'OFFLINE') {
          this.xuanzhongWay = {
            logoUrl: res.data.methodGuideVos[0].logoUrl,
            content: res.data.methodGuideVos[0].content,
            subject:  res.data.methodGuideVos[0].subject
          }
        } else {
          const steps = res.data.methodGuideVos[0].content.split('\n').map((line) => {
            const [title, content] = line.split('. ');
            const id = Number(title.match(/\d+/)[0]);
            const formattedTitle = `${id}.`;
            return { title: formattedTitle, text: content };
          });
          this.textData = steps
          this.boldInstructions = steps.map((instruction) => {
            const regex = /\((.*?)\)/g;
            const matchedText = instruction.text.match(regex);
            if (matchedText && matchedText.length > 0) {
              const firstMatch = matchedText[0];
              const boldText = `<strong> ${firstMatch}</strong>`;
              const modifiedText = instruction.text.replace(firstMatch, boldText);
              return modifiedText;
            }

            return instruction.text;
          });
        }
        this.showLoading = false
        this.progressValue = 100;
        clearInterval(timer);
      }).catch(error =>{
        this.showLoading = false
        this.progressValue = 100;
        clearInterval(timer);
      })
    },
    Refresh() {
      this.init()
    }
  }
}
</script>
<style lang="less">
  .tishi {
    .van-popup {
      padding: 0px !important;
      overflow-y: auto !important;
      font-family: PingFangSC-Medium, PingFang SC;
    }
  }
</style>
<style lang="less" scoped>
.content13 {
  display: flex;
align-items: center;
width: 80%;
background: #fff;
border-radius: 8px;
box-shadow: 0px 2px 20px 0px rgba(190, 192, 190, 0.3);
padding: 10px;
margin: auto;
}
.content11 {
  width: 93%;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0%);
  background: #FFFFFF;
  box-shadow: 0px 2px 20px 0px rgba(0,94,202,0.3);
  border-radius: 16px;
  height: 290px;
  padding: 20px;
  box-sizing: border-box;
  overflow: scroll;
}
.content12 {
  width: 93%;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0%);
  background: #FFFFFF;
  box-shadow: 0px 2px 20px 0px rgba(0,94,202,0.3);
  border-radius: 16px;
  padding: 20px;
  box-sizing: border-box;
  overflow: scroll;
}
.content11_div {
  background: rgba(153,153,153,0.08);
  border-radius: 4px;
  border: 1px solid #D3D3D3;
  padding: 5px 10px;
  /* height: 38px; */
  line-height: 30px;
  box-sizing: border-box;
  margin-top: 10px;
}
.bj {
  position: relative;
  .bj_img {
    width: 100%;
  }
  .title {
    position: absolute;
    z-index: 2;
    top: 44%;
    right: 90px;
    color: #28B27C;
    line-height: 20px;
    font-size: 3.7vw;
  }
  .title2 {
    position: absolute;
    z-index: 2;
    top: 57%;
    left: 54%;
    color: #28B27C;
    line-height: 20px;
    font-weight: 900;
    font-size: 5.7vw;
  }
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
    display: block;
    width: 78%;
    z-index: 1;
    left: 0%;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 800;
    color: #333333;
    font-size: 5vw;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.c2 {
  width: 78%;
  margin: auto;
  display: flex;
  align-items: center;
  font-size: 4vw;
  font-family: PingFang-SC-Heavy, PingFang-SC;
  font-weight: 800;
  color: #006847;
  cursor: pointer;
  img {
    margin-right: 10px;
    width: 7vw;
  }
}
.c3 {
  margin-top: 18%;
  img {
    width: 40%;
  }
  div {
    margin-top: 10px;
    font-size: 4vw;
    color: #006847;
    font-family: PingFangSC-Regular, PingFang SC;
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
.hint {
  padding: 40px 10px 10px 10px;
  .hint_c1 {
    margin-top: 20px;
    text-align: left;
    .top {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
      span {
        color: #28B27C;
        font-weight: 600;
        font-size: 4vw;
      }
    }
    .bottom {
      margin-top: 10px;
      font-weight: 500;
      font-size: 4vw;
      padding-left: 20px;
      box-sizing: border-box;
      color: #666666;
    }
  }
}
</style>
