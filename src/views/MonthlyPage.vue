<template>
  <section class="monthly-page">
   <Modal class = "add-schedule" v-on:close="closeModal" v-if="modal">
     <p>new schedule</p>
      <template slot="footer">
        <div class = "clearfix">
            <div class ="schedule-date">
              date
              <Datepicker 
              class ="datepicker"
              :language="ja"
              :format="DatePickerFormat"
              placeholder="Select Date"
              v-model ="date"
              >

              </Datepicker>
            </div>
            <div class="schedule-content">
              schedule

              <input type="text" v-model="newItem" maxlength="14">
            </div>
          </div>
          <button class="modal-add-schedule btn" v-on:click="addSchedule">add</button>
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
  </section>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import {ja} from 'vuejs-datepicker/dist/locale'
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
      newItem:'',
      date: '',
      schedules:[],
      currentDate: moment(),
      newItem:'',
      modal: false,
      message: '',
      options: {
          animation: 200
      },
      ja:ja,
      DatePickerFormat: 'yyyy/MM/dd'
    }
  },

    watch:{
        schedules:{
            handler: function(){
                localStorage.setItem(`${this.customformat(this.date)}schedules`, JSON.stringify(this.schedules));
            }
        },
        // getThisMonth:{
        //     handler: function(){
        //         this.schedules  = JSON.parse(localStorage.getItem(`${this.customformat(this.date)}schedules`)) || [];
        //     }
        // }
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
    customformat(value){
      return moment(value).format('YYYYMMDD');
    },
        addSchedule(){
          let customformatDate = this.customformat(this.date);
          if(customformatDate === 'Invalid date') return;
          if(this.newItem === '') return;
          
            // if(this.schedules.length == 6) return;
            var schedule = {
                id: `m${customformatDate}schedule${++this.uniqueKey}`,
                date: `${customformatDate}schedules`,
                item: this.newItem,
                isPassed:false
            };
        this.schedules = JSON.parse(localStorage.getItem(`${this.customformat(this.date)}schedules`)) || [];
          this.schedules.push(schedule);
            this.newItem = '';
            this.closeModal();
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
<style scoped >
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
  z-index: 4;
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
  z-index: 4;
}
button.add-schedule{
  background: none;
  border:none;
  position: fixed;
  bottom:10px;
  right:10px;
  outline: none;
  cursor: pointer;
  z-index: 4;
}
.fa-plus-circle{
  color: rgba(3, 45, 109, 0.8);
  font-size:60px;
}
.datepicker >>> .vdp-datepicker__calendar{
  position:fixed;
  top:0px;
  left:0;
}
.schedule-date{
  float:left;
}
.schedule-content{
  float:right;
}
.schedule-content input{
  display: block;
  margin-left:5px;
  background-color:#fff;
}
.datepicker >>> input {
  background-color:#fff;
}
.clearfix::after {
   content: "";
   display: block;
   clear: both;
}

button.modal-add-schedule{
    position: relative;
    bottom: -12px;
    height:30px;
    line-height: 0;
    background: rgb(13, 106, 245, 0.8);
    color: #fff;
}
button.modal-add-schedule:hover{
    background: rgb(13, 106, 245);
}
button.modal-add-todo:hover{
    background: rgb(13, 106, 245);
}
</style>