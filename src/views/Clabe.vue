<template>
  <div class="home_1">
    <div class="bj" :style="order.data.selectedMethod === 'OFFLINE'?'max-height: 200px;':'max-height: 210px;'">
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
        {{ order.data.merchantName }}
      </div>
    </div>
    <div v-if="order.data.selectedMethod === 'OFFLINE'" class="xuanzeClass" @click="OfflineStyleShow = !OfflineStyleShow">
      <div style="display: flex;align-items: center;">
        <div style="width:30px;margin-left:15px;">
          <img style="width: 100%;" :src="xuanzhongWay.logoUrl" alt="">
        </div>
        <div style="text-align: left;margin-left:15px;font-size: 12px;color:#343434;font-weight: 600;font-family: PingFangSC-Semibold, PingFang SC;">
          {{ xuanzhongWay.subject }}
        </div>
      </div>
      <div style="width:20px;height:20px;margin-left:15px;">
        <img style="width: 100%;" src="../assets/jiantou.png" alt="">
      </div>
    </div>
    <div class="OfflineStyle" v-if="!OfflineStyleShow">
      <div class="div2">
        <div class="div1" v-for="(item, index) in order.data.methodGuideVos" :key="index" @click="ClickWay(item)">
          <div style="border: 1px solid #666666;border-radius: 50%;width: 12px;height: 12px;"></div>
          <div style="width:28px;height:28px;margin-left:15px;">
            <img style="width: 100%;" :src="item.logoUrl" alt="">
          </div>
          <div style="text-align: left;margin-left:15px;font-size: 12px;color:#343434;font-weight: 600;font-family: PingFangSC-Semibold, PingFang SC;">
            {{ item.subject }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="OfflineStyleShow">
      <div class="c1" style="margin-top:35px;">
        <img src="../assets/div1.png" alt="">
        <span>
          {{ order.data.va }}
          <img :data-clipboard-text="order.data.va" class="tag-read" @click="copy" style="width:4vw;" src="../assets/copy.png" alt="">
        </span>
        <div v-if="order.data.selectedMethod === 'OFFLINE'">{{ this.title.Cash }}</div>
        <div v-else>Clabe</div>
      </div>
      <div v-if="xuanzhongWay.content" class="c1" style="margin-top:20px;">
        <img src="../assets/div1.png" alt="">
        <span>
          {{ xuanzhongWay.content }}
        </span>
        <div>{{ this.title.PartnershipNo }}</div>
      </div>
      <div v-if="order.data.selectedMethod === 'OFFLINE'" @click="tiaozhuan" style="font-size: 20px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #006847;">
        {{ this.title.PuntosPago }}
      </div>

      <div v-if="order.data.selectedMethod !== 'OFFLINE'" class="c2" @click="hintShow = true">
        <img src="../assets/right.png" alt="">
        {{ this.title.HowToPay }}
      </div>
      <div class="c3" style="margin-top:3%;" v-if="order.data.selectedMethod === 'OFFLINE'">
        <img style="width:20%;" src="../assets/await.png" alt="">
        <div>
          {{ this.title.NotReceived }}
        </div>
      </div>
      <div class="c3" v-else>
        <img src="../assets/await.png" alt="">
        <div>
          {{ this.title.NotReceived }}
        </div>
      </div>
    </div>
    <div class="c4" :style="order.data.selectedMethod === 'OFFLINE'?'margin-top: 5px;':'margin-top: 25px;'">
      <button style="width:60%;" @click="Refresh">
        <img src="../assets/button.png" alt="">
        <span class="span2">{{ this.title.Refresh }}</span>
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
        <div class="hint" style="height:100%;" v-else>
          <div>
            <img style="width: 80%;padding-bottom: 20px;" src="../assets/hint.png" alt="">
          </div>
          <div style="height: 81%;
overflow-y: auto;word-break: break-all;text-align: left;white-space: pre-wrap;line-height: 36px;">
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">1. </span><span style="font-size:3.7vw;">Abre tu banca movil.</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">2. </span><span style="font-size:3.7vw;">Selecciona "transferencia rapida".</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">3. </span><span style="font-size:3.7vw;">Selecciona "transferencia rapida" Ingresa la CLABE numerica de 18digitos <span style="font-weight:bold;">({{ order.data.va }})</span>.</span>
            <img :data-clipboard-text="order.data.va" class="tag-read" @click="copy" style="margin-bottom: -6px;margin-left:6px;width:4vw;" src="../assets/copy2.png" alt=""> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">4. </span><span style="font-size:3.7vw;">En nombre de benefciario, ingresa "Jordan Harden".</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">5. </span><span style="font-size:3.7vw;">En concepto, ingresa "pago".</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">6. </span><span style="font-size:3.7vw;">Ingrese el monto apropiado en "Importe".</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">7. </span><span style="font-size:3.7vw;">Pulsa "continuar".</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">8. </span><span style="font-size:3.7vw;">Confrma que los datos estan correctosde ser asi, selecciona "Transferir".</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">9. </span><span style="font-size:3.7vw;">Ingresa su token o su contrasena paracompletar el proceso.</span> <br>
            <span style="color: #28B27C;font-weight: 500;font-size: 4.2vw;">10. </span><span style="font-size:3.7vw;">Se completa la transferencia</span> <br>
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
      OfflineStyleShow: true,
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
      title2: 'EN'
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
  mounted() {
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
    tiaozhuan() {
      var data = 'https://www.paycashglobal.com/buscador.php'
      window.open(data, '_blank');
    },
    xuanze2() {
      this.xuanzhongShow = false
    },
    ClickWay(e) {
      this.xuanzhongWay = e
      this.xuanzhongShow = true
      this.OfflineStyleShow = true
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
      // overflow-y: auto !important;
      font-family: PingFangSC-Medium, PingFang SC;
    }
  }
</style>
<style lang="less" scoped>
.xuanzeClass {
  // height: 84px;
  background: #FFFFFF;
  box-shadow: 0px 2px 16px 0px rgba(150,204,183,0.3);
  border-radius: 12px;
  margin: auto;
  padding: 20px 24px;
  width: 87%;
  max-height: 60px;
  box-sizing: border-box;
  display: flex;
  // margin-bottom: 42px;
  // margin-top: -50px;
  align-items: center;
  justify-content: space-between;
}
.OfflineStyle {
  background-image: url(../assets/div3.png);
  width: 87%;
  margin: auto;
  height: 45vh;
  box-sizing: border-box;
  padding: 5px 0;
  background-size: 100% 100%;
  margin-top: 10px;
  .div2 {
    height: 100%;
    overflow-y: auto;
    .div1 {
      background: #FFFFFF;
      box-shadow: 0px 2px 16px 0px rgba(150,204,183,0.3);
      border-radius: 8px;
      border: 1px solid #D6D6D6;
      width: 90%;
      padding: 10px;
      box-sizing: border-box;
      margin: auto;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
  }
  
}
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
  max-height: 270px;
  overflow: hidden;
  .bj_img {
    width: 100%;
    margin-top: -75px;
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
}
.c1 {
  position: relative;
  text-align: center;
  img {
    width: 95%;
    max-height: 86px;
  }
  div {
    position: absolute;
    top: -20px;
    left: 8.5%;
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
  margin-top: 10%;
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
