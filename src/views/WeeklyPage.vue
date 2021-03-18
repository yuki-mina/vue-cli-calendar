<template>
  <div class="weekly-page row">
    <div class="prev" v-on:click="prevWeek">&laquo;</div>
    <div class="next" v-on:click="nextWeek">&raquo;</div>
    <div class="weekly-title">
          <div class = "ymd-from">{{getThisWeek[0].ymd}}</div>
          <div class = "ymd-to">〜{{getThisWeek[6].ymd}}</div>
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
      monday: 0,
    }
  },
  computed: {
    // thisYear(){ return this.today.getFullYear(); },
    // thisMonth(){ return this.today.getMonth()+1; },
    date(){ return this.today.getDate(); },
    dayNum(){ return this.today.getDay(); },
    thisMonday(){ 
      var thisDate =this.date - this.dayNum + 1;
      var startDate = new Date(this.today.getFullYear(), this.today.getMonth(), thisDate);
      this.monday = startDate;
      return  startDate;
    },
    getThisWeek(){
      this.thisWeek = [];
      var wd =['日','月','火','水','木','金','土'];
      this.thisMonday;
        for(var i=0; i<7; i++){
          this.monday.setDate(this.monday.getDate() +i)
          var month = this.monday.getMonth()+1;
          var date = this.monday.getDate();
          var thisDay = {
            id:`${this.monday.getFullYear()}-${("0"+month).slice(-2)}-${("0"+date).slice(-2)}`,
            ymd: `${this.monday.getFullYear()}/${("0"+month).slice(-2)}/${("0"+date).slice(-2)}`,
            date: this.monday.getDate(),
            isToday:false,
            day: wd[i+1]
          };
          if(i+1 == 7) thisDay.day = wd[0];
          this.thisWeek.push(thisDay);
          this.monday.setDate(this.monday.getDate() -i)
        }
      return this.thisWeek;
    },
  },
  methods:{
    prevWeek: function(){
      this.thisWeek = [];
      this.monday.setDate(this.monday.getDate() -7);
      console.log(this.monday.getFullYear())
    },
    nextWeek: function(){
      this.thisWeek = [];
      this.monday.setDate(this.monday.getDate() +7);
    }
  }
}
</script>

<style scoped>
.weekly-page{
  height:100vh;
  margin-left: auto;
}
.weekly-title{
    display:inline-block;
    border: 0.5px solid rgba(0, 9, 22, 0.5);
    height:350px;
    width:320px;
    background:rgba(140, 181, 241, 0.3);
    font: 2em sans-serif;
    color: rgba(3, 45, 109, 0.8);
}
.ymd-from{
 text-align: left;
}
.ymd-to{
text-align: right;
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