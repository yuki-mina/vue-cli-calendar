<template>
    <div id="weekly-com" class="weekly-com">
        <div>
            {{thisWeek.date}}
            <span class="day">({{thisWeek.day}})</span>
        </div>
        <form v-on:submit.prevent>
        <input type="text" v-model="newItem" maxlength="14">
        <div>
            <button type="button" class="add-todo btn btn-warning" v-on:click="addList">Todo</button>
            <button type="button" class="add-schedule btn btn-success" v-on:click="addSchedule">Schedule</button>
        </div>
        </form>
        <hr class="top-line"> 
        <ul class="ul-todo">
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox" v-model="todo.isDone" v-bind:id="thisWeek.date+thisWeek.day+todo.id">
                <label :for="thisWeek.date+thisWeek.day+todo.id" v-bind:class="{done:todo.isDone}">{{todo.item}}</label>
                <button class="del-todo"  aria-label="閉じる" v-on:click="deleteTodo(index)">
                    <i class="fas fa-times"></i>
                </button>
            </li>
        </ul>
        <hr class="center-line">
        <ul class="ul-schedule">
            <li v-for="(schedule, index) in schedules" :key="index">
                <input type="checkbox" v-model="schedule.isPassed" v-bind:id="thisWeek.date+thisWeek.day+schedule.id">
                <label :for="thisWeek.date+thisWeek.day+schedule.id" v-bind:class="{passed:schedule.isPassed}">{{schedule.item}}</label>
                <button class="del-schedule"  aria-label="閉じる" v-on:click="deleteSchedule(index)">
                    <i class="fas fa-times"></i>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        thisWeek:{
            date: Number,
            isToday: Boolean,
            day: String
        }
    },
    data: function(){
        return{
            newItem:'',
            todos:[],
            schedules:[],
            uniqueKey: 0,
        }
    },
    methods: {
        addList: function(){
            if(this.newItem == '') return;
            if(this.todos.length == 7) return;
            var todo = {
                id: ++this.uniqueKey,
                item: this.newItem,
                isDone:false
            };
            this.todos.push(todo);
            this.newItem = '';
        },
        deleteTodo: function(index){
            this.todos.splice(index,1);
        },
        addSchedule: function(){
            if(this.newItem == '') return;
            if(this.schedules.length == 7) return;
            var schedule = {
                id: ++this.uniqueKey+10,
                item: this.newItem,
                isDone:false
            };
            this.schedules.push(schedule);
            this.newItem = '';
        },
        deleteSchedule: function(index){
            this.schedules.splice(index,1);
        }
    }
}
</script>

<style scoped>
.weekly-com{
    display:inline-block;
    border: 1px solid #363536;
    width:320px;
    height:350px;
}
.day{
    font-size: 15px;
}
form{
    height:36px;
}
ul.ul-todo {
    list-style: none;
    text-align: left;
    padding:0;
    margin:0 0 0 20px;
    height:128px;
    position:relative;
    top:10px;
}
ul.ul-schedule{
    list-style: none;
    text-align: left;
    padding:0;
    margin:0 0 0 20px;
    height:130px;
    position:relative;
    top:6px;
}
li{
    height:17px;
    position:relative;
}
li > label{
    line-height:0.3;
    font-family: none;
    margin-left:5px;
    position:relative;
    top: -2px;
}
ul.ul-todo >li > label{
    font-size: 16px;
    background: linear-gradient(transparent 50%, #fcd358 50%);
}
ul.ul-schedule >li > label{
    font-size: 16px;
    background: linear-gradient(transparent 50%, #abd6c3 50%);
}

ul.ul-todo > li > label.done{
    font-size: 13px;
    text-decoration: line-through;
    text-decoration-color:#adacad;
    text-decoration-thickness: 1px;
    color:#adacad;
    background: none;
}
ul.ul-schedule > li > label.passed{
    font-size: 13px;
    text-decoration: line-through;
    text-decoration-color:#adacad;
    text-decoration-thickness: 1px;
    color:#adacad;
    background: none;
}
input[type="text"]{
    width:70%;
    height:20px;
}
input[type=checkbox]{
    display:none;
}
input[type="checkbox"] + label:before {
  content: '';
  display: block;
  width: 15px;
  height: 15px;
  border: 1px solid #101111;
  display: inline-block;
  margin-right:8px;
  opacity: .6;
  -webkit-transition: all .12s, border-color .08s;
  transition: all .12s, border-color .08s;
}

ul.ul-todo >li > input[type="checkbox"]:checked + label:before {
  width: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #adacad;
  border-right-color: #adacad;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
ul.ul-schedule >li > input[type="checkbox"]:checked + label:before {
  width: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #adacad;
  border-right-color: #adacad;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
button.del-todo{
    border:none;
    background:#fff;
    margin:0 0 0 3px;
    padding:0;
}
button.del-schedule{
    border:none;
    background:#fff;
    margin:0 0 0 3px;
    padding:0;
}
button.add-todo,button.add-schedule{
    height:18px;
    line-height: 0;
}
button{
   margin-left:5px;
}
.fa-times{
    color:rgb(209, 179, 179);
}
hr{
    margin:8px 0;
}
hr.center-line{
    position:relative;
    top:5px;
    margin:4px 0;
}
hr.top-line{
    position:relative;
    top:10px;
    margin:4px 0;
}
</style>