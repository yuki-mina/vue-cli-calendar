<template>
    <div>
             {{thisMonth.date}}
    </div>
</template>

<script>
export default {
    props: {
        thisMonth:{
            id: String,
            ymd: String,
            isToday: Boolean,
            date: String
            // day: String
        }
    },
}
</script>

<style scoped>

</style>