<template>
  <StackLayout>
    <TextField hint="Search" v-model="search" />
    <ListView for="diy in filteredDIYs">
      <v-template if="$odd">
        <Label
          class="h4 blue-bg"
          @tap="showPopup(diy)"
          :text="diyText(diy)"
          padding="20"
        />
      </v-template>
      <v-template>
        <Label
          class="h4 green-bg"
          @tap="showPopup(diy)"
          :text="diyText(diy)"
          padding="20"
        />
      </v-template>
    </ListView>
  </StackLayout>
</template>

<script>
import diys from '../db/diys';
import {getMaterialsFromDIY} from '../db/matcher';

const {prompt, inputType} = require('tns-core-modules/ui/dialogs');

export default {
  name: 'DIYList',
  data() {
    return {
      search: '',
      diys: diys.sort((a, b) => a.name.localeCompare(b.name)),
    };
  },
  methods: {
    diyText(diy) {
      return `${diy.name} - Selling price: ${diy.price}`;
    },
    showPopup(diy) {
      prompt({
        title: 'Amout',
        message: `How many ${diy.name} do you need?`,
        okButtonText: 'Add',
        cancelButtonText: 'Cancel',
        defaultText: 0,
        inputType: inputType.number,
      }).then(({result, text}) => {
        if (result) {
          getMaterialsFromDIY(diy).forEach(m => {
            this.$emit('addMaterial', {
              amount: m.quantity * parseInt(text, 10),
              name: m.materialName,
            });
          });
        }
      });
    },
  },
  computed: {
    filteredDIYs() {
      return this.search
        ? this.diys.filter(m =>
            m.name.toLowerCase().includes(this.search.toLowerCase()),
          )
        : this.diys;
    },
  },
};
</script>
