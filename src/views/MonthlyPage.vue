<template>
  <div class="monthly-page">
   <Modal class = "add-schedule" v-on:close="closeModal" v-if="modal">
     <p>new schedule</p>
     
      <template slot="footer">
        <div class ="schedule-date">date
        </div>
          <Datepicker class ="datepicker"></Datepicker>
        <div class="content">schedule
        </div>
          <input type="text" v-model="newItem" maxlength="14">
      </template>
    </Modal>
    <button class="add-schedule" v-on:click="openModal"><i class="fas fa-plus-circle"></i></button>
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
import Datepicker from "vuejs-datepicker"
import MonthlyCom from '@/components/MonthlyCom.vue'
import moment from "moment"
import Modal from '@/components/Modal.vue'
export default {
  name: 'MonthlyPage',
  components: {
    MonthlyCom,
    Datepicker,
    Modal,
  },
  data(){
    return {
      currentDate: moment(),
      newItem:'',
      modal: false,
      message: '',
      options: {
          animation: 200
      },
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
    },

        addSchedule(){
            // if(this.newItem == '') return;
            // if(this.schedules.length == 6) return;
            // var schedule = {
            //     id: `w${this.thisWeek.id}schedule${++this.uniqueKey}`,
            //     date: `${this.thisWeek.id}schedules`,
            //     item: this.newItem,
            //     isPassed:false
            // };
            // this.schedules.push(schedule);
            // this.newItem = '';
            // this.closeModal();
            console.log(99)
        },
        deleteSchedule: function(index){
            this.schedules.splice(index,1);
        },
        openModal() {
            this.modal = true;
        },
        closeModal() {
        this.modal = false
        },
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
button.add-schedule{
  background: none;
  border:none;
  position: fixed;
  bottom:10px;
  right:10px;
  outline: none;
  cursor: pointer;
  z-index: 3;
}
.fa-plus-circle{
  color: rgba(3, 45, 109, 0.8);
  font-size:60px;
}
/* .add-schedule >>> .modal-window {
    height:440px;
    width:340px;
} */
.add-schedule >>> .modal-footer{
  text-align:left;
}
.add-schedule{
  position:absolute;
}
/* .schedule-date{
  overflow: visible;
} */
/* .content{
  position:relative;
  top:0;
} */
input[type="text"]{
    display:block;
    width:176px;
    height:30px;
}
.datepicker >>> .vdp-datepicker__calendar{
  position:relative;
  top:0;
}
</style>