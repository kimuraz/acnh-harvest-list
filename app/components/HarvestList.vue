<template>
  <StackLayout>
    <ListView for="harvest in Object.keys(list)" style="height: 90%">
      <v-template>
        <Label class="h4" :text="harvest" padding="20" />
      </v-template>
    </ListView>
    <Button text="Clear all" class="red-bg" @tap="$emit('removeAll')"/>
  </StackLayout>
</template>

<script>
export default {
  name: 'HarvestList',
  props: {
    list: {
      required: true,
      type: Object,
    },
  },
};
</script>
