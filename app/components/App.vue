<template>
  <Page>
    <ActionBar
      title="Welcome to NativeScript-Vue!"
      android:flat="true"
      class="brown-bg"
    />
    <TabView
      android:tabBackgroundColor="#53ba82"
      android:tabTextColor="#643A2B"
      android:selectedTabTextColor="#ffffff"
      androidSelectedTabHighlightColor="#ffffff"
    >
      <TabViewItem title="All materials">
        <MaterialsList @addMaterial="addMaterial" />
      </TabViewItem>
      <TabViewItem title="DIY" @addMaterial="addMaterial">
        <DIYList />
      </TabViewItem>
      <TabViewItem title="Harvest list">
        <HarvestList :list="list" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import MaterialsList from './MaterialsList';
import DIYList from './DIYList';
import HarvestList from './HarvestList';

const appSettings = require('tns-core-modules/application-settings');

export default {
  components: {
    MaterialsList,
    DIYList,
    HarvestList,
  },
  data() {
    return {
      list: {},
    };
  },
  created() {
    this.list = JSON.parse(appSettings.getString('list', '{}'));
  },
  methods: {
    addMaterial(material) {
      if (this.list[material.name]) {
        this.list[material.name] += material.amount;
      } else {
        this.$set(this.list, material.name, material.amount);
      }
      appSettings.setString('list', JSON.stringify(this.list));
    },
    removeMaterial(material, amount) {
      const curAmount = this.list[material.name];
      this.list[material.name] =
        curAmount - amount < 0 ? 0 : curAmount - amount;
    },
  },
};
</script>

<style scoped>
ActionBar {
  color: #ffffff;
}
</style>
