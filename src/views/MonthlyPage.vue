<template>
  <div class="monthly-page">
    <monthly-com/>
  </div>
</template>

<script>
// @ is an alias to /src
import MonthlyCom from '@/components/MonthlyCom.vue'

export default {
  name: 'MonthlyPage',
  components: {
    MonthlyCom
  }
}
</script>