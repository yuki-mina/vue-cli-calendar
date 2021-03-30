<template>
    <section id="monthly-com" class="monthly-com">
            <!-- <Balloon class = "schedule-edit" v-on:close="closeBalloon" v-if="balloon">
                <div class = "bottons">
                    <button class="btn edit-schedule">edit</button>
                    <button class="btn del-schedule">delete</button>
                </div>
            </Balloon> -->
        <div class="header-color">
             {{thisMonth.date}}
        </div>
        <ul class="ul-schedule">
            <draggable :options="options">
                <li class="p-schedule" v-for="(schedule, index) in schedules" :key="index" v-on:click="openBalloon">
                    {{schedule.item}}
                </li>
            </draggable>
        </ul>
    </section>
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
        monthId:{
            handler: function(){
                this.schedules = JSON.parse(localStorage.getItem(`${this.thisMonth.id}schedules`)) || [];
            }
        }
    },
    mounted(){
        this.schedules = JSON.parse(localStorage.getItem(`${this.thisMonth.id}schedules`)) || [];
    },
    computed:{
        monthId(){
            return this.thisMonth.id;
        }
    },
    methods:{
        edit(){
            console.log(22)
        },
        openBalloon(event) {
            this.balloon = true;
            event.target.classList.toggle('choosing');
        },
        closeBalloon() {
        this.balloon = false;
        },
    }
}
</script>

<style scoped lang="scss">
.monthly-com{
    position:relative;
    .header-color{
        height:23px;
        background:rgba(140, 181, 241, 0.3);
    }
    ul{
        &.ul-schedule{
            font-size: 16px;
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
            line-height:1;
            font-family: none;
            margin-left:5px;
            position:relative;
            top: -2px;
            &.choosing{
                background:rgb(13, 106, 245, 0.8);
                color:#fff;
            }
        }
    }
    input[type="text"]{
        width:70%;
        height:20px;
    }
    button{
        margin-left:4px;
        &.edit-schedule{
            height:30px;
            line-height: 0;
            background: rgb(13, 106, 245, 0.8);
            color: #fff;
            &:hover{
                background: rgb(13, 106, 245);
            }
        }
        &.del-schedule{
            height:30px;
            line-height: 0;
            background: rgba(238, 134, 134, 0.8);
            color: #fff;
            &:hover{
                background: rgba(238, 134, 134);
            }
        }
    }
    .schedule-edit >>> .modal-window {
        width:500px;
        height:500px;
    }
    .bottons{
        padding-top:4px;
    }
}
</style>