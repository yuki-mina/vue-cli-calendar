<template>
  <div class="monthly-page">
    <div class="prev" v-on:click="prevMonth">&laquo;</div>
    <div class="next" v-on:click="nextMonth">&raquo;</div>
    <div class="monthly-title">
      {{currentDate.format("MM")}}月
    </div>
    <div class = "week" v-for="(week, index) in getThisMonth" :key="index">
      <monthly-com class = "day" v-for="(day,index) in week" :key="index" :thisMonth="day"/>
    </div>
  </div>
</template>

<script>
import MonthlyCom from '@/components/MonthlyCom.vue'
import moment from "moment";
export default {
  name: 'MonthlyPage',
  components: {
    MonthlyCom
  },
  data(){
    return {
    currentDate: moment(),
    }
  },
  computed: {
    getThisMonth(){
      return this.getCalendar();
    }
  },
  methods: {
    getStartDate(){
      let date = moment(this.currentDate);
      date.startOf("month");
      const firstDayNum = date.day();
      return date.subtract(firstDayNum,"days")
    },
    getEndDate(){
      let date = moment(this.currentDate);
      date.endOf("month");
      const endDayNum = date.day();
      return date.add(6 - endDayNum,"days");
    },
    getCalendar(){
      const startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNum = Math.ceil(endDate.diff(startDate,"days")/7);

      let thisMonth = [];
      for(let week = 0; week < weekNum; week++){
        let weekRow = [];
        for (let day = 0; day < 7; day++){
          weekRow.push({
            date: startDate.get("date"),
            id:`${startDate.format("YYYYMMDD")}`,
            ymd: `${startDate.format("YYYY/MM/DD")}`,
            date: startDate.get("date"),
            isToday:false,
            // day: wd[i+1]
          })
          startDate.add(1,"days");
        }
        thisMonth.push(weekRow);
      }
      return thisMonth;
    },
    nextMonth(){
      this.currentDate = moment(this.currentDate).add(1,"month");
    },
    prevMonth(){
      this.currentDate = moment(this.currentDate).subtract(1,"month");
    }
  },
}
</script>
<style scoped>
.monthly-page{
  width:100%;
  margin:auto;
}
.monthly-title{
  border-bottom: 0.5px solid rgba(0, 9, 22, 0.5);
    font: 2em sans-serif;
    color: rgba(3, 45, 109, 0.8);
    padding-bottom:10px;
}
.week{
  display:flex;
  border-left: 0.5px solid rgba(0, 9, 22, 0.5);
}
.day{
  flex:1;
  min-height:125px;
  border-right: 0.5px solid rgba(0, 9, 22, 0.5);
  border-bottom: 0.5px solid rgba(0, 9, 22, 0.5);
}
.prev{
  position: fixed;
  top:50%;
  left:0;
  width:60px;
  height:120px;
  cursor: pointer;
  font-size:80px;
  color: rgba(3, 45, 109, 0.8);
  background: rgba(140, 181, 241, 0.4);
  border-radius:0 100px 100px 0;
  margin:0;
  padding:0;
  z-index: 1;
}
.next{
  position: fixed;
  top:50%;
  right:0;
  width:60px;
  height:120px;
  cursor: pointer;
  font-size:80px;
  color: rgba(3, 45, 109, 0.8);
  background: rgba(140, 181, 241, 0.4);
  border-radius:100px 0 0 100px;
  margin:0;
  padding:0;
  z-index: 1;
}
</style>