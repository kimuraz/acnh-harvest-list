<template>
  <StackLayout>
    <ListView
      ref="list"
      for="harvest in Object.keys(list).sort()"
      style="height: 90%"
    >
      <v-template>
        <WrapLayout
          :class="{
            'light-green-bg': list[harvest].curAmount >= list[harvest].amount,
          }"
        >
          <Label class="h3" :text="harvest" width="45%" />
          <Button
            text="-"
            class="red-bg"
            fontSize="20"
            @tap="emitChange(harvest, list[harvest].curAmount - 1)"
            width="8%"
          />
          <Label class="h3" :text="list[harvest].curAmount" width="5%" />
          <Button
            fontSize="20"
            text="+"
            class="blue-bg"
            @tap="emitChange(harvest, list[harvest].curAmount + 1)"
            width="8%"
          />
          <Label class="h3" text="of" width="5%" />
          <Label class="h3" :text="list[harvest].amount" width="5%" />
          <Button
            class="red-bg"
            text="Remove"
            @tap="$emit('remove', harvest)"
            width="10%"
          />
        </WrapLayout>
      </v-template>
    </ListView>
    <Button text="Clear all" class="red-bg" @tap="removeAll" />
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
  methods: {
    emitChange(material, value) {
      this.$emit('change', {material, value});
      this.$nextTick(() => {
        this.$refs.list.refresh();
      });
    },
    removeOne(material) {
      this.$emit('remove', material);
      this.$nextTick(() => {
        this.$refs.list.refresh();
      });
    },
    removeAll() {
      this.$emit('removeAll');
      this.$nextTick(() => {
        this.$refs.list.refresh();
      });
    },
  },
};
</script>
