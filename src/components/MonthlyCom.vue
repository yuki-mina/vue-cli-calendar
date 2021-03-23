<template>
    <div id="monthly-com" class="monthly-com">
        <div class="header-color">
             {{thisMonth.date}}
        </div>
        <ul class="ul-schedule">
            <Balloon class = "schedule-edit" v-on:close="closeBalloon" v-if="balloon">
                <div class = "bottons">
                    <button class="btn edit-schedule">edit</button>
                    <button class="btn del-schedule">delete</button>
                </div>
            </Balloon>
            <draggable :options="options">
                <li v-for="(schedule, index) in schedules" :key="index" v-on:click="openBalloon">
                    <span class="p-schedule">
                        <input type="checkbox" v-model="schedule.isPassed" v-bind:id="schedule.id">
                        <label :for="schedule.id">{{schedule.item}}</label>
                    </span>
                </li>
            </draggable>
        </ul>
    </div>
</template>

<script>
import Balloon from './Balloon.vue'
import draggable from 'vuedraggable'
export default {
    components:{
        Balloon,
        draggable,
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
            balloon: false,
            message: '',
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
    methods:{
        edit(){
            console.log(22)
        },
        openBalloon(event) {
            this.balloon = true;
        console.log(event);
        },
        closeBalloon() {
        this.balloon = false;
        },
    }
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
    background: rgb(13, 106, 245,0.3);
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

.bottons{
    padding-top:4px;
}
.choosing{
    background:rgb(13, 106, 245, 0.8);
    color:#fff;
}
button.edit-schedule{
    height:30px;
    line-height: 0;
    background: rgb(13, 106, 245, 0.8);
    color: #fff;
}
button.edit-schedule:hover{
    background: rgb(13, 106, 245);
}
button.del-schedule{
    height:30px;
    line-height: 0;
    background: rgba(238, 134, 134, 0.8);
    color: #fff;
}
button.del-schedule:hover{
    background: rgba(238, 134, 134);
}
button{
   margin-left:4px;
}
.schedule-edit >>> .modal-window {
    width:500px;
    height:500px;
}
</style>