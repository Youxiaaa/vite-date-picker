<script setup>
import { computed, ref } from 'vue'

// 取得年月日
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth())
const date = ref(new Date().getDate())

// 取得每個月的第一天是禮拜幾
const monthFirstDay = computed(() => {
  return new Date(year.value, month.value, 1).getDay()
})

// 判斷當月有幾天
const filterDays = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate()
})

// 判斷每個月的第一天要推幾天
const pushDays = computed(() => {
  switch(monthFirstDay.value) {
    case 0:
      return 6
    case 1:
      return 0
    case 2:
      return 1
    case 3:
      return 2
    case 4:
      return 3
    case 5:
      return 4
    case 6:
      return 5
  }
})

// 預設當天日期
let datePicker = ref(Date.parse(`${year.value}, ${month.value}, ${date.value}`))

// 選擇日期
const selectDate = (date) => {
  // 日期轉時間戳
  datePicker.value = Date.parse(`${year.value}, ${month.value}, ${date}`)
}

// 判斷選擇到的日期
const filterDate = (item) => {
  if (Date.parse(`${year.value}, ${month.value}, ${item}`) === datePicker.value) return true
  return false
}

// 判斷是否為已過日期
const filterOldDate = (item) => {
  const newDate = new Date()
  if (new Date(`${year.value}/${month.value}/${item}`) < new Date(`${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`)) return true
  return false
}

// 切換月份
const changeMonth = (bool) => {
  if (!bool) {
    year.value --
    month.value = 11
  } else {
    year.value ++
    month.value = 0
  }
}

// 月份切換動畫
const changeMonthAnimation = () => {
  isShow.value = false
  setTimeout(() => {
    isShow.value = true
  }, 300)
}

const isShow = ref(true)
</script>

<template>
  <section>
    <div data-aos="fade" data-aos-duration="500">
      <div class="flex justify-center items-center w-full min-h-screen select-none">
        <div class="w-80 p-4 shadow-md rounded-xl bg-[#003b64] text-white">
          <div class="flex items-center justify-between gap-4 p-4">

            <p @click="month === 0 ? changeMonth(false) : month --, changeMonthAnimation()" class="cursor-pointer font-bold">&lt;</p>

            <div class="flex gap-4">
              <p class="font-bold">{{ year }}</p>
              <p class="font-bold">{{ month + 1 }}月</p>
            </div>

            <p @click="month === 11 ? changeMonth(true) : month ++, changeMonthAnimation()" class="cursor-pointer font-bold">&gt;</p>

          </div>

          <div v-pre class="grid grid-cols-7 text-center mt-4 font-bold">
            <div class="col-span-1">一</div>
            <div class="col-span-1">二</div>
            <div class="col-span-1">三</div>
            <div class="col-span-1">四</div>
            <div class="col-span-1">五</div>
            <div class="col-span-1 text-pink-500">六</div>
            <div class="col-span-1 text-pink-500">日</div>
          </div>

          <transition name="fade" >
            <div v-if="isShow" class="grid grid-cols-7 text-center mt-4 font-bold">
              <div v-for="day in pushDays" :key="day"></div>
              <div @click="selectDate(item)" v-for="item in filterDays" :key="item" class="col-span-1 h-10 flex items-center justify-center cursor-pointer rounded-full" :class="{'bg-[#ffb900] text-black': filterDate(item), 'text-[#777] pointer-events-none': filterOldDate(item)}">{{ item }}</div>
            </div>
          </transition>

        </div>
      </div>
    </div>
  </section>
</template>
