<template>
  <div class="weekly-page row">
    <div class="prev" v-on:click="prevWeek">&laquo;</div>
    <div class="next" v-on:click="nextWeek">&raquo;</div>
    <div class="weekly-title">
        <div class="this-month">{{thisYear}}/{{thisMonth}}</div>
        
        <!-- {{$data}} -->
    </div>
    <weekly-com :thisWeek="getThisWeek[0]"/>
    <weekly-com :thisWeek="getThisWeek[1]"/>
    <weekly-com :thisWeek="getThisWeek[2]"/>
    <weekly-com :thisWeek="getThisWeek[3]"/>
    <weekly-com :thisWeek="getThisWeek[4]"/>
    <weekly-com :thisWeek="getThisWeek[5]"/>
    <weekly-com :thisWeek="getThisWeek[6]"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WeeklyCom from '@/components/WeeklyCom.vue'

export default {
  name: 'WeeklyPage',
  components: {
    WeeklyCom
  },
  data: function(){
    return{
      today: new Date(),
      thisWeek:[],
      monday: null,
      // year: new Date().getFullYear(),
      // month: new Date().getMonth(),
      // lastDate: 0,
      // Date0: 0,
      // dates:[],
      // thisMon: 0,
    }
  },
  computed: {
    thisYear(){ return this.today.getFullYear(); },
    thisMonth(){ return this.today.getMonth()+1; },
    date(){ return this.today.getDate(); },
    dayNum(){ return this.today.getDay(); },
    thisMonday(){ 
      var thisDate =this.date - this.dayNum + 1;
      var startDate = new Date(this.thisYear, this.thisMonth, thisDate).getDate();
      return  startDate;
      },
    thisSunday(){ return this.thisMonday + 6; },
    getThisWeek(){
      var wd =['日','月','火','水','木','金','土'];
      for(var i=0; i<7; i++){
        var thisDay = {
          date: this.thisMonday+i,
          isToday:false,
          day: wd[i+1]
        };
        if(i+1 == 7) thisDay.day = wd[0];
        this.thisWeek.push(thisDay);
      }
      return this.thisWeek;
    }
   
  },
  methods:{
    prevWeek: function(){
      this.thisMonday = this.thisMonday-7;
      this.thisWeek = [];
    },
    nextWeek: function(){
       this.thisMon = this.thisMon+7;
      this.thisWeek = [];
    }
  }
}
</script>

<style scoped>
.weekly-page{
  height:100vh;
}
.weekly-title{
    display:inline-block;
    border: 1px solid #363536;
    height:350px;
    width:320px;
}
.this-month{
  font: 3em sans-serif;
}
.prev{
  position: fixed;
  top:50%;
  left:0;
  width:60px;
  height:120px;
  cursor: pointer;
  font-size:80px;
  background: rgb(220, 220, 220);
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
  background: rgb(220, 220, 220);
  border-radius:100px 0 0 100px;
  margin:0;
  padding:0;
  z-index: 1;
}
</style>