<template>
  <StackLayout>
    <TextField hint="Search" v-model="search" />
    <ListView for="material in filteredMaterials">
      <v-template if="$odd">
        <Label
          class="h4 blue-bg"
          @tap="showPopup(material)"
          :text="materialText(material)"
          padding="20"
        />
      </v-template>
      <v-template>
        <Label
          class="h4 green-bg"
          @tap="showPopup(material)"
          :text="materialText(material)"
          padding="20"
        />
      </v-template>
    </ListView>
  </StackLayout>
</template>

<script>
import materials from '../db/materials';

export default {
  name: 'MaterialsList',
  data() {
    return {
      search: '',
      materials: materials.sort((a, b) => a.name.localeCompare(b.name)),
    };
  },
  methods: {
    materialText(material) {
      return `${material.name} - Selling price: ${material.price}`;
    },
    showPopup(material) {},
  },
  computed: {
    filteredMaterials() {
      return this.search
        ? this.materials.filter(m => m.name.toLowerCase().startsWith(this.search.toLowerCase()))
        : this.materials;
    },
  },
};
</script>
