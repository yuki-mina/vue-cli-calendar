(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3244cd52"],{7599:function(e,t,s){"use strict";s("93b0")},"820e":function(e,t,s){"use strict";s("ae23")},"93b0":function(e,t,s){},"9c5f":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"weekly-page row"},[s("div",{staticClass:"prev",on:{click:e.prevWeek}},[e._v("«")]),s("div",{staticClass:"next",on:{click:e.nextWeek}},[e._v("»")]),s("div",{staticClass:"weekly-title"},[s("div",{staticClass:"ymd-from"},[e._v(e._s(e.getThisWeek[0].ymd))]),s("div",{staticClass:"ymd-to"},[e._v("〜"+e._s(e.getThisWeek[6].ymd))])]),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[0]}}),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[1]}}),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[2]}}),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[3]}}),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[4]}}),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[5]}}),s("weekly-com",{attrs:{thisWeek:e.getThisWeek[6]}})],1)},a=[],o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"weekly-com",attrs:{id:"weekly-com"}},[e.modal?s("Modal",{on:{close:e.closeModal}},[s("p",[e._v("Todo or Schedule")]),s("template",{slot:"footer"},[s("button",{staticClass:"modal-add-schedule btn",on:{click:e.addSchedule}},[e._v("Schedule")]),s("button",{staticClass:"modal-add-todo btn",attrs:{focus:""},on:{click:e.addList}},[e._v("Todo")])])],2):e._e(),s("div",{staticClass:"header-color"},[s("div",[e._v(" "+e._s(e.thisWeek.date)+" "),s("span",{staticClass:"day"},[e._v("("+e._s(e.thisWeek.day)+")")])]),s("form",{on:{submit:function(e){e.preventDefault()}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.newItem,expression:"newItem"}],attrs:{type:"text",maxlength:"14"},domProps:{value:e.newItem},on:{input:function(t){t.target.composing||(e.newItem=t.target.value)}}}),s("div",[s("button",{staticClass:"modal-show",staticStyle:{display:"none"},on:{click:e.openModal}}),s("button",{staticClass:"add-schedule btn",on:{click:e.addSchedule}},[e._v("Schedule")]),s("button",{staticClass:"add-todo btn",on:{click:e.addList}},[e._v("Todo")])])])]),s("ul",{staticClass:"ul-schedule"},[s("draggable",{attrs:{options:e.options}},e._l(e.schedules,(function(t,i){return s("li",{key:i},[s("span",{staticClass:"p-schedule"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.isPassed,expression:"schedule.isPassed"}],attrs:{type:"checkbox",id:t.id},domProps:{checked:Array.isArray(t.isPassed)?e._i(t.isPassed,null)>-1:t.isPassed},on:{change:function(s){var i=t.isPassed,a=s.target,o=!!a.checked;if(Array.isArray(i)){var d=null,n=e._i(i,d);a.checked?n<0&&e.$set(t,"isPassed",i.concat([d])):n>-1&&e.$set(t,"isPassed",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(t,"isPassed",o)}}}),s("label",{attrs:{for:t.id}},[s("span",[e._v(e._s(t.item))])]),s("button",{staticClass:"del-schedule",attrs:{"aria-label":"閉じる"},on:{click:function(t){return e.deleteSchedule(i)}}},[s("i",{staticClass:"fas fa-times"})])])])})),0)],1),s("hr",{staticClass:"center-line"}),s("ul",{staticClass:"ul-todo"},[s("draggable",{attrs:{options:e.options}},e._l(e.todos,(function(t,i){return s("li",{key:i},[s("span",{staticClass:"p-todo"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.isDone,expression:"todo.isDone"}],attrs:{type:"checkbox",id:t.id},domProps:{checked:Array.isArray(t.isDone)?e._i(t.isDone,null)>-1:t.isDone},on:{change:function(s){var i=t.isDone,a=s.target,o=!!a.checked;if(Array.isArray(i)){var d=null,n=e._i(i,d);a.checked?n<0&&e.$set(t,"isDone",i.concat([d])):n>-1&&e.$set(t,"isDone",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(t,"isDone",o)}}}),s("label",{class:{done:t.isDone},attrs:{for:t.id}},[s("span",[e._v(e._s(t.item))])]),s("button",{staticClass:"del-todo",attrs:{"aria-label":"閉じる"},on:{click:function(t){return e.deleteTodo(i)}}},[s("i",{staticClass:"fas fa-times"})])])])})),0)],1)],1)},d=[],n=s("714b"),l=s("b76a"),c=s.n(l),h={components:{Modal:n["a"],draggable:c.a},props:{thisWeek:{id:String,ymd:String,isToday:Boolean,date:Date,day:String}},data:function(){return{newItem:"",todos:[],schedules:[],uniqueKey:0,modal:!1,message:"",options:{animation:200}}},watch:{todos:{handler:function(){localStorage.setItem(this.thisWeek.id+"todos",JSON.stringify(this.todos))},deep:!0},schedules:{handler:function(){localStorage.setItem(this.thisWeek.id+"schedules",JSON.stringify(this.schedules))}},weekId:{handler:function(){this.todos=JSON.parse(localStorage.getItem(this.thisWeek.id+"todos"))||[],this.schedules=JSON.parse(localStorage.getItem(this.thisWeek.id+"schedules"))||[]}}},mounted(){this.todos=JSON.parse(localStorage.getItem(this.thisWeek.id+"todos"))||[],this.schedules=JSON.parse(localStorage.getItem(this.thisWeek.id+"schedules"))||[]},computed:{weekId(){return this.thisWeek.id}},methods:{addList:function(){if(""!=this.newItem&&6!=this.todos.length){var e={id:`w${this.thisWeek.id}todo${++this.uniqueKey}`,date:this.thisWeek.id+"todos",item:this.newItem,isDone:!1};this.todos.push(e),this.newItem="",this.closeModal()}},deleteTodo:function(e){this.todos.splice(e,1)},addSchedule:function(){if(""!=this.newItem&&6!=this.schedules.length){var e={id:`w${this.thisWeek.id}schedule${++this.uniqueKey}`,date:this.thisWeek.id+"schedules",item:this.newItem,isPassed:!1};this.schedules.push(e),this.newItem="",this.closeModal()}},deleteSchedule:function(e){this.schedules.splice(e,1)},openModal(){""!=this.newItem&&7!=this.todos.length&&(this.modal=!0)},closeModal(){this.modal=!1}}},r=h,u=(s("820e"),s("2877")),m=Object(u["a"])(r,o,d,!1,null,"30d8c42a",null),k=m.exports,y={name:"WeeklyPage",components:{WeeklyCom:k},data(){return{today:new Date,thisWeek:[],monday:0}},computed:{date(){return this.today.getDate()},dayNum(){return this.today.getDay()},thisMonday(){var e=this.date-this.dayNum+1,t=new Date(this.today.getFullYear(),this.today.getMonth(),e);return this.monday=t,t},getThisWeek(){this.thisWeek=[];var e=["日","月","火","水","木","金","土"];this.thisMonday;for(var t=0;t<7;t++){this.monday.setDate(this.monday.getDate()+t);var s=this.monday.getMonth()+1,i=this.monday.getDate(),a={id:`${this.monday.getFullYear()}${("0"+s).slice(-2)}${("0"+i).slice(-2)}`,ymd:`${this.monday.getFullYear()}/${("0"+s).slice(-2)}/${("0"+i).slice(-2)}`,date:this.monday.getDate(),isToday:!1,day:e[t+1]};t+1==7&&(a.day=e[0]),this.thisWeek.push(a),this.monday.setDate(this.monday.getDate()-t)}return this.thisWeek}},methods:{prevWeek:function(){this.thisWeek=[],this.monday.setDate(this.monday.getDate()-7)},nextWeek:function(){this.thisWeek=[],this.monday.setDate(this.monday.getDate()+7)}}},p=y,g=(s("7599"),Object(u["a"])(p,i,a,!1,null,"d98ebc52",null));t["default"]=g.exports},ae23:function(e,t,s){}}]);
//# sourceMappingURL=chunk-3244cd52.808c7b19.js.map