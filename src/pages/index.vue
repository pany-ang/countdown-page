<script lang="ts" setup>
import { ref } from "vue"

const isBrowserSupport = "speechSynthesis" in window

// 定义响应式数据
const playText = ref<string>("")
const countdownStart = ref<string>("")
const countdownValue = ref<number>(0)
const countdownInterval = ref<NodeJS.Timeout | null>(null)
const isCounting = ref<boolean>(false)
const errorMessage = ref<string>("")

// 限制输入值在 1 ~ 3600 范围内
function handleInput() {
  const value = Number(countdownStart.value)

  if (Number.isNaN(value) || value < 1 || value > 3600) {
    countdownStart.value = ""
    errorMessage.value = "请输入 1 到 3600 之间的数字"
  } else {
    errorMessage.value = "" // 清除提示信息
  }
}

// 播放简单的“叮”声
function playSound() {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  oscillator.type = "triangle" // 使用三角波，声音更圆润
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // 设置频率为 800Hz
  oscillator.connect(audioContext.destination)

  // 添加音量控制，使声音逐渐变大然后消失，模拟一个短促的 “叮” 声
  const gainNode = audioContext.createGain()
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05) // 音量渐强
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2) // 然后渐弱
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.2) // 播放 0.2 秒
}

// 播放简单的 “叮” 声
function playTextSound() {
  const utterance = new SpeechSynthesisUtterance(playText.value || "叮") // 创建语音合成对象

  // 设置语音属性
  utterance.lang = "zh-CN" // 设置中文
  utterance.pitch = 1 // 设置语调
  utterance.rate = 1 // 设置语速
  utterance.volume = 1 // 设置音量

  // 播放语音
  speechSynthesis.speak(utterance)
}

// 开始倒计时
function startCountdown() {
  const startValue = Number.parseInt(countdownStart.value, 10)
  if (startValue <= 0) return

  countdownValue.value = startValue
  isCounting.value = true

  // 清除之前的定时器
  if (countdownInterval.value) clearInterval(countdownInterval.value)

  // 启动倒计时
  countdownInterval.value = setInterval(() => {
    if (countdownValue.value > 1) {
      countdownValue.value--
    } else {
      // 播放声音
      if (isBrowserSupport) {
        playTextSound()
      } else {
        playSound()
      }
      // 倒计时结束后重置并开始新一轮倒计时
      countdownValue.value = Number.parseInt(countdownStart.value, 10)
    }
  }, 1000)
}

// 暂停并重置倒计时
function pauseCountdown() {
  if (countdownInterval.value) clearInterval(countdownInterval.value)
  countdownValue.value = 0
  playText.value = ""
  countdownStart.value = ""
  isCounting.value = false
}
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="input-group">
        <input
          v-model="countdownStart"
          type="number"
          placeholder="倒计时起始数字"
          @input="handleInput"
          :disabled="isCounting"
        >
        <input
          v-model="playText"
          type="text"
          placeholder="语音文案, 默认叮"
          :disabled="isCounting && isBrowserSupport"
        >
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>

      <div class="buttons">
        <button @click="startCountdown" :disabled="isCounting || !countdownStart">
          开始倒计时
        </button>
        <button @click="pauseCountdown" :disabled="!isCounting">
          暂停
        </button>
      </div>

      <div class="countdown-display">
        <p>{{ countdownValue }} 秒</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
}

.content {
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
  input {
    padding: 10px;
    font-size: 18px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}

.buttons button {
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.countdown-display p {
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
