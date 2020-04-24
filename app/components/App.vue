<template>
  <Page>
    <ActionBar title="AC New Horizons Harvest List" class="light-bg">
      <ActionItem
        ios.position="right"
        android.position="popup"
        text="Settings"
        @tap="$navigateTo(aboutPage)"
      />
    </ActionBar>
    <TabView
      android:tabBackgroundColor="#53ba82"
      android:tabTextColor="#643A2B"
      android:selectedTabTextColor="#ffffff"
      androidSelectedTabHighlightColor="#ffffff"
      iosIconRenderingMode="alwaysOriginal"
    >
      <TabViewItem
        title="Raw materials"
        iconSource="~/assets/images/branch-icon.png"
      >
        <MaterialsList @addMaterial="addMaterial" />
      </TabViewItem>
      <TabViewItem title="DIY" iconSource="~/assets/images/acorn-icon.png">
        <DIYList @addMaterial="addMaterial" />
      </TabViewItem>
      <TabViewItem title="My list" iconSource="~/assets/images/tick-icon.png">
        <HarvestList :list="list" @removeAll="removeAll" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import MaterialsList from './MaterialsList';
import DIYList from './DIYList';
import HarvestList from './HarvestList';
import About from './About';

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
      aboutPage: About,
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
    removeAll() {
      this.list = {};
      appSettings.setString('list', JSON.stringify(this.list));
    },
  },
};
</script>
