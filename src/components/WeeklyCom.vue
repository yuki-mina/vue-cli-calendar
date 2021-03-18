<template>
    <div id="weekly-com" class="weekly-com">
         <Modal v-on:close="closeModal" v-if="modal">
      <p>Todo or Schedule</p>
      <template slot="footer">
        <button class="modal-add-schedule btn" v-on:click="addSchedule">Schedule</button>
        <button class="modal-add-todo btn" v-on:click="addList" focus>Todo</button>
      </template>
    </Modal>
        <div class="header-color">
            <div>
                {{thisWeek.date}}
                <span class="day">({{thisWeek.day}})</span>
            </div>
            <form v-on:submit.prevent>
            <input type="text" v-model="newItem" maxlength="14">
            <div>
                <button class="modal-show" @click="openModal" style="display:none;"></button>
                <button class="add-schedule btn" v-on:click="addSchedule">Schedule</button>
                <button class="add-todo btn" v-on:click="addList">Todo</button>
            </div>
            </form>
            </div>
        <!-- <hr class="top-line">  -->
        <ul class="ul-schedule">
            <li v-for="(schedule, index) in schedules" :key="index">
                <span class="p-schedule">
                    <input type="checkbox" v-model="schedule.isPassed" v-bind:id="thisWeek.ymd+schedule.id+'schedule'">
                    <label :for="thisWeek.ymd+schedule.id+'schedule'" v-bind:class="{passed:schedule.isPassed}">{{schedule.item}}</label>
                    <button class="del-schedule"  aria-label="閉じる" v-on:click="deleteSchedule(index)">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            </li>
        </ul>
        <hr class="center-line">
        <ul class="ul-todo">
            <li v-for="(todo, index) in todos" :key="index">
                <span class="p-todo">
                    <input type="checkbox" v-model="todo.isDone" v-bind:id="thisWeek.ymd+todo.id+'todo'">
                    <label :for="thisWeek.ymd+todo.id+'todo'" v-bind:class="{done:todo.isDone}">{{todo.item}}</label>
                    <button class="del-todo"  aria-label="閉じる" v-on:click="deleteTodo(index)">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import Modal from './Modal.vue'
export default {
    components:{
        Modal
    },
    props: {
        thisWeek:{
            ymd: String,
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
            modal: false,
            message: ''
        }
    },
    watch:{
        todos: {
            handler: function(){
                localStorage.setItem(`${this.thisWeek.ymd}todos`,JSON.stringify(this.todos));

            },
            deep:true
        },
        schedules:{
            handler: function(){
                localStorage.setItem(`${this.thisWeek.ymd}schedules`,JSON.stringify(this.schedules))
            }
        }
    },
    mounted: function(){
        this.todos = JSON.parse(localStorage.getItem(`${this.thisWeek.ymd}todos`)) || [];
        this.schedules = JSON.parse(localStorage.getItem(`${this.thisWeek.ymd}schedules`)) || [];
    },
    methods: {
        addList: function(){
            if(this.newItem == '') return;
            if(this.todos.length == 6) return;
            var todo = {
                id: ++this.uniqueKey,
                item: this.newItem,
                isDone:false
            };
            this.todos.push(todo);
            this.newItem = '';
            this.closeModal();
        },
        deleteTodo: function(index){
            this.todos.splice(index,1);
        },
        addSchedule: function(){
            if(this.newItem == '') return;
            if(this.schedules.length == 6) return;
            var schedule = {
                id: ++this.uniqueKey,
                item: this.newItem,
                isPassed:false
            };
            this.schedules.push(schedule);
            this.newItem = '';
            this.closeModal();
        },
        deleteSchedule: function(index){
            this.schedules.splice(index,1);
        },
        openModal() {
            if(this.newItem == '') return;
            if(this.todos.length == 7) return;
            this.modal = true;
        },
        closeModal() {
        this.modal = false
        },
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
.header-color{
    position:relative;
    left:-12px;
    background:rgba(140, 181, 241, 0.3);
    width: 320px;
    height: 80px;
    margin: 0;
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
    margin:0;
    height:130px;
    position:relative;
    top:6px;
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
}
li > span > label{
    line-height:0.3;
    font-family: none;
    margin-left:5px;
    position:relative;
    top: -2px;
}
ul.ul-todo >li > span > label{
    font-size: 16px;
    background: linear-gradient(transparent 20%, #f3dd9c 20%);
}
ul.ul-schedule >li > span > label{
    font-size: 16px;
    /* background: linear-gradient(transparent 20%, #abd6c3 20%); */
}

ul.ul-todo > li > span > label.done{
    font-size: 16px;
    text-decoration: line-through;
    text-decoration-color:#adacad;
    text-decoration-thickness: 1px;
    color:#adacad;
    background: none;
}
/* ul.ul-schedule > li > label.passed{
    font-size: 13px;
    text-decoration: line-through;
    text-decoration-color:#adacad;
    text-decoration-thickness: 1px;
    color:#adacad;
    background: none;
} */
input[type="text"]{
    width:70%;
    height:20px;
}
input[type=checkbox]{
    display:none;
}
ul.ul-todo >li > span > input[type="checkbox"] + label:before {
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
ul.ul-schedule >li > span > input[type="checkbox"] + label:before {
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
  background: -webkit-radial-gradient(#7bbda1,#7bbda1);
  background: -moz-radial-gradient(#7bbda1,#7bbda1);
  background: radial-gradient(#7bbda1,#7bbda1);

}

ul.ul-todo >li > span > input[type="checkbox"]:checked + label:before {
  width: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #adacad;
  border-right-color: #adacad;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  margin-right:18px;
}
/* ul.ul-schedule >li > input[type="checkbox"]:checked + label:before {
  width: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #adacad;
  border-right-color: #adacad;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
} */
button.del-todo{
    opacity: 0;
    border:none;
    background:#fff;
    margin:0 0 0 3px;
    padding:0;
}
button.del-schedule{
    opacity: 0;
    border:none;
    background:#fff;
    margin:0 0 0 3px;
    padding:0;
}
span:hover button.del-todo,
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
button.add-todo,
button.modal-add-todo{
    height:18px;
    line-height: 0;
    background: rgb(13, 106, 245, 0.8);
    color: #fff;
}
button.add-schedule:hover,
button.modal-add-schedule:hover{
    background: rgb(13, 106, 245);
}
button.add-todo:hover,
button.modal-add-todo:hover{
    background: rgb(13, 106, 245);
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
    /* top:5px; */
    margin:4px 0;
}
/* hr.top-line{
    position:relative;
    top:10px;
    margin:4px 0;
} */
</style>