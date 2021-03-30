<template>
    <section id="weekly-com" class="weekly-com">
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
                <button class="modal-show" v-on:click="openModal" style="display:none;"></button>
                <button class="add-schedule btn" v-on:click="addSchedule">Schedule</button>
                <button class="add-todo btn" v-on:click="addList">Todo</button>
            </div>
            </form>
        </div>
        <!-- <hr class="top-line">  -->
        <ul class="ul-schedule">
            <draggable :options="options">
                <li v-for="(schedule, index) in schedules" :key="index">
                    <span class="p-schedule">
                        <input type="checkbox" v-model="schedule.isPassed" v-bind:id="schedule.id">
                        <label :for="schedule.id"><span>{{schedule.item}}</span></label>
                        <button class="del-schedule"  aria-label="閉じる" v-on:click="deleteSchedule(index)">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                </li>
            </draggable>
        </ul>
        <hr class="center-line">
        <ul class="ul-todo">
            <draggable :options="options">
                <li v-for="(todo, index) in todos" :key="index">
                    <span class="p-todo">
                        <input type="checkbox" v-model="todo.isDone" v-bind:id="todo.id">
                        <label :for="todo.id" v-bind:class="{done:todo.isDone}"><span>{{todo.item}}</span></label>
                        <button class="del-todo"  aria-label="閉じる" v-on:click="deleteTodo(index)">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                </li>
            </draggable>
        </ul>
    </section>
</template>

<script>
import Modal from './Modal.vue'
import draggable from 'vuedraggable'
export default {
    components:{
        Modal,
        draggable
    },
    props: {
        thisWeek:{
            id: String,
            ymd: String,
            isToday: Boolean,
            date: Date,
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
            message: '',
            options: {
                animation: 200
            },
        }
    },
    watch:{
        todos: {
            handler: function(){
                localStorage.setItem(`${this.thisWeek.id}todos`,JSON.stringify(this.todos));

            },
            deep:true
        },
        schedules:{
            handler: function(){
                localStorage.setItem(`${this.thisWeek.id}schedules`,JSON.stringify(this.schedules));
            }
        },
        weekId:{
            handler: function(){
                this.todos = JSON.parse(localStorage.getItem(`${this.thisWeek.id}todos`)) || [];
                this.schedules = JSON.parse(localStorage.getItem(`${this.thisWeek.id}schedules`)) || [];
            }
        }
    },
    mounted(){
        this.todos = JSON.parse(localStorage.getItem(`${this.thisWeek.id}todos`)) || [];
        this.schedules = JSON.parse(localStorage.getItem(`${this.thisWeek.id}schedules`)) || [];
    },
    computed:{
        weekId(){
            return this.thisWeek.id;
        }
    },
    methods: {
        addList: function(){
            if(this.newItem == '') return;
            if(this.todos.length == 6) return;
            var todo = {
                id: `w${this.thisWeek.id}todo${++this.uniqueKey}`,
                date: `${this.thisWeek.id}todos`,
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
                id: `w${this.thisWeek.id}schedule${++this.uniqueKey}`,
                date: `${this.thisWeek.id}schedules`,
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

<style scoped lang="scss">
.weekly-com{
    display:inline-block;
    border-right: 0.5px solid rgba(0, 9, 22, 0.5);
    border-bottom: 0.5px solid rgba(0, 9, 22, 0.5);
    width:320px;
    height:350px;
    .header-color{
        position:relative;
        left:-12px;
        background:rgba(140, 181, 241, 0.3);
        width: 320px;
        height: 80px;
        margin: 0;
        span.day{
            font-size: 15px;
        }
    }
    form{
        height:36px;
    }
    ul{
        &.ul-todo {
            list-style: none;
            text-align: left;
            padding:0;
            margin:0;
            height:130px;
            position:relative;
            top:6px;
            label{
                background: linear-gradient(transparent 20%, #f3dd9c 20%);
                &.done{
                    font-size: 16px;
                    text-decoration: line-through;
                    text-decoration-color:#adacad;
                    text-decoration-thickness: 1px;
                    color:#adacad;
                    background: none;
                }
                span{
                    position:relative;
                    top:-2px;
                }
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
            input[type="checkbox"]:checked + label:before {
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
        }
        &.ul-schedule{
            list-style: none;
            text-align: left;
            padding:0;
            margin:0;
            height:128px;
            position:relative;
            top:10px;
            label{
                background: linear-gradient(transparent 20%, rgb(13, 106, 245,0.3) 20%);
            }
        }
        li{
            height:17px;
            position:relative;
            margin-bottom:2px;
        }
    }

    label{
        height:15px;
        line-height:15px;
        font-family: none;
        margin-left:5px;
        font-size: 16px;
        padding:0 5px 0 2px;

    }
    input{
        &[type=text]{
            width:70%;
            height:20px;
            background: #fff;
            border: 1px solid #adacad;
        }
        &[type=checkbox]{
            display:none;
        }
    }

    button{
        margin-left:5px;
        outline: none;
        &.del-todo{
            opacity: 0;
            border:none;
            background:#fff;
            margin:0 0 0 3px;
            padding:0;
        }
        &.del-schedule{
            opacity: 0;
            border:none;
            background:#fff;
            margin:0 0 0 3px;
            padding:0;
        }
        &.add-schedule,
        &.modal-add-schedule{
            height:18px;
            line-height: 0;
            background: rgb(13, 106, 245, 0.8);
            color: #fff;
            &:hover{
                background: rgb(13, 106, 245);
            }
        }
        &.add-todo,
        &.modal-add-todo{
            height:18px;
            line-height: 0;
            background: rgb(13, 106, 245, 0.8);
            color: #fff;
            &:hover{
                background: rgb(13, 106, 245);
            }
        }
        &.modal-add-schedule,
        &.modal-add-todo{
            height:36px;
        }
    }
    span:hover button.del-todo,
    span:hover button.del-schedule{
        opacity:1;
        -webkit-transition:	all 0.2s ease;
        transition:		all 0.2s ease;
    }
    .fa-times{
        color:rgb(209, 179, 179);
    }
    hr{
        margin:8px 0;
        &.center-line{
            position:relative;
            /* top:5px; */
            margin:4px 0;
        }
    }
}
</style>