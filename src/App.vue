<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0px;
  padding: 0px;
}
.van-collapse-item--border::after {
  border: 1.5px solid #ebedf0;
}
    .van-popup{
      padding: 40px !important;
      overflow: hidden !important;
    }
    .fulfilling-bouncing-circle-spinner, .fulfilling-bouncing-circle-spinner * {
      box-sizing: border-box;
    }

    .fulfilling-bouncing-circle-spinner {
      height: 100px;
      width: 100px;
      position: relative;
      animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
    }

    .fulfilling-bouncing-circle-spinner .orbit {
      height: 100px;
      width: 100px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      border: calc(100px * 0.03) solid #41b884;
      animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite 4000ms ease;
    }

    .fulfilling-bouncing-circle-spinner .circle {
      height: 100px;
      width: 100px;
      color: #41b884;
      display: block;
      border-radius: 50%;
      position: relative;
      border: calc(100px * 0.1) solid #41b884;
      animation: fulfilling-bouncing-circle-spinner-circle-animation infinite 4000ms ease;
      transform: rotate(0deg) scale(1);
    }

    @keyframes fulfilling-bouncing-circle-spinner-animation {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1);
      }
      62.5% {
        transform: scale(0.8);
      }
      75% {
        transform: scale(1);
      }
      87.5% {
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes fulfilling-bouncing-circle-spinner-circle-animation {
      0% {
        transform: scale(1);
        border-color: transparent;
        border-top-color: inherit;
      }
      16.7% {
        border-color: transparent;
        border-top-color: initial;
        border-right-color: initial;
      }
      33.4% {
        border-color: transparent;
        border-top-color: inherit;
        border-right-color: inherit;
        border-bottom-color: inherit;
      }
      50% {
        border-color: inherit;
        transform: scale(1);
      }
      62.5% {
        border-color: inherit;
        transform: scale(1.4);
      }
      75% {
        border-color: inherit;
        transform: scale(1);
        opacity: 1;
      }
      87.5% {
        border-color: inherit;
        transform: scale(1.4);
      }
      100% {
        border-color: transparent;
        border-top-color: inherit;
        transform: scale(1);
      }
    }
</style>
