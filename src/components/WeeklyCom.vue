<template>
    <div id="weekly-com" class="weekly-com">
        <div>
            {{thisWeek.date}}
            <span class="day">({{thisWeek.day}})</span>
        </div>
        <form v-on:submit.prevent>
        <input type="text" v-model="newItem" maxlength="15">
        <button class="add-todo" v-on:click="addList">T</button>
        <button class="add-schedule" v-on:click="addSchedule">S</button>
        </form>
        <hr> 
        <ul class="ul-todo">
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox" v-model="todo.isDone">
                <span v-bind:class="{done:todo.isDone}">{{todo.item}}</span>
                <button class="del-todo" v-on:click="deleteTodo(index)">d</button>
            </li>
        </ul>
        <hr class="center-line">
        <ul class="ul-schedule">
            <li v-for="(schedule, index) in schedules" :key="index">
                <input type="checkbox" v-model="schedule.isPassed">
                <span v-bind:class="{passed:schedule.isPassed}">{{schedule.item}}</span>
                <button class="del-schedule" v-on:click="deleteSchedule(index)">d</button>
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
            schedules:[]
        }
    },
    methods: {
        addList: function(){
            if(this.newItem == '') return;
            if(this.todos.length == 7) return;
            var todo = {
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
    height:31px;
}
ul.ul-todo {
    list-style: none;
    text-align: left;
    padding:0;
    margin:0 0 0 20px;
    height:128px;
    position:relative;
    top:1px;
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
    font-size:13px;
}
li > span.done{
    text-decoration: line-through;
}
li > span.passed{
    text-decoration: line-through;
}
input[type="text"]{
    width:70%;
    height:20px;
}
input[type="checkbox"]{
    margin-right:5px;
}
button.del-todo,button.del-schedule{
    width:20px;
    height:15px;
    margin-left:5px;
}
button.add-todo,button.add-schedule{
    width:10%;
    height:20px;
}
button{
    font: 400 13.3333px Arial;
    padding: 1px 2px;
}
hr{
    margin:8px 0;
}
hr.center-line{
    position:relative;
    top:0px;
    margin:4px 0;
}
</style>