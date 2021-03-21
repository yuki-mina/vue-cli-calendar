<template>
    <div id="monthly-com" class="monthly-com">
        <div class="header-color">
             {{thisMonth.date}}
        </div>
        <ul class="ul-schedule">
            <draggable :options="options">
                <li v-for="(schedule, index) in schedules" :key="index">
                    <span class="p-schedule">
                        <input type="checkbox" v-model="schedule.isPassed" v-bind:id="schedule.id">
                        <label :for="schedule.id">{{schedule.item}}</label>
                        <button class="del-schedule"  aria-label="閉じる" v-on:click="deleteSchedule(index)">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                </li>
            </draggable>
        </ul>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components:{
        draggable
    },
    props: {
        thisMonth:{
            id: String,
            ymd: String,
            isToday: Boolean,
            date: String,
            // day: String
        }
    },
    data: function(){
        return{
            newItem:'',
            // todos:[],
            schedules:[],
            uniqueKey: 0,
            // modal: false,
            // message: '',
            options: {
                animation: 200
            },
        }
    },
    watch:{
        schedules:{
            handler: function(){
                localStorage.setItem(`${this.thisMonth.id}schedules`,JSON.stringify(this.schedules));
            }
        },
        weekId:{
            handler: function(){
                this.schedules = JSON.parse(localStorage.getItem(`${this.thisMonth.id}schedules`)) || [];
            }
        }
    },
    mounted(){
        this.schedules = JSON.parse(localStorage.getItem(`${this.thisMonth.id}schedules`)) || [];
    },
    computed:{
        weekId(){
            return this.thisMonth.id;
        }
    },
}
</script>

<style scoped>
.header-color{
    height:23px;
    background:rgba(140, 181, 241, 0.3);
}
ul.ul-schedule{
    list-style: none;
    text-align: left;
    padding:0;
    margin:0;
    height:128px;
    position:relative;
    top:10px;
}
li{
    height:17px;
    position:relative;
    margin-bottom:2px;
    background: rgb(171, 214, 195,0.5);
    margin:2px 10px;
}
li label{
    line-height:0.3;
    font-family: none;
    margin-left:5px;
    position:relative;
    top: -2px;
}
ul.ul-schedule label{
    font-size: 16px;
}
input[type="text"]{
    width:70%;
    height:20px;
}
input[type=checkbox]{
    display:none;
}
/* ul.ul-schedule input[type="checkbox"] + label:before {
  content: '';
  display: block;
  width: 15px;
  height: 15px;
  border: 1px solid #101111;
  border-radius: 50%;
  display: inline-block;
  margin-right:8px;
  opacity: .6;
  -webkit-transition: all .12s, border-color .08s;
  transition: all .12s, border-color .08s;
  background: rgb(13, 106, 245, 0.8);

} */
/* ul.ul-schedule input[type="checkbox"]:checked + label:before {
  border: 1px solid #3f3e3e;
  background: #ee2222;
} */

button.del-schedule{
    opacity: 0;
    border:none;
    background:#fff;
    margin:0 0 0 3px;
    padding:0;
}
span:hover button.del-schedule{
    opacity:1;
    -webkit-transition:	all 0.2s ease;
	transition:		all 0.2s ease;
}
button.add-schedule,
button.modal-add-schedule{
    height:18px;
    line-height: 0;
    background: rgb(13, 106, 245, 0.8);
    color: #fff;
}
button.add-schedule:hover,
button.modal-add-schedule:hover{
    background: rgb(13, 106, 245);
}
button.modal-add-schedule{
    height:36px;
}
button{
   margin-left:5px;
}
.fa-times{
    color:rgb(209, 179, 179);
    background: rgb(171, 214, 195,0.5);
}
</style>