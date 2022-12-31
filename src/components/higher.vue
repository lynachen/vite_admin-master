<template>
  <div>
    <p>{{ word }}</p>
    <countdown v-bind="attrs"></countdown>
  </div>
</template>

<script>
import Countdown from "@/components/countdown.vue";

export default {
  components: {
    Countdown
  },
  props: {
    word: {
      type: String
    }
  },
  setup(props, { attrs }) {
    return {
      attrs
    };
  }
};
</script>
