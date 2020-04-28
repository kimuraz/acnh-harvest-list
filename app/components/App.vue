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
        title="Materials"
        iconSource="~/assets/images/branch-icon.png"
      >
        <MaterialsList @addMaterial="addMaterial" />
      </TabViewItem>
      <TabViewItem title="DIY" iconSource="~/assets/images/acorn-icon.png">
        <DIYList @addMaterial="addMaterial" />
      </TabViewItem>
      <TabViewItem title="My list" iconSource="~/assets/images/tick-icon.png">
        <HarvestList
          :list="list"
          @remove="removeOne"
          @removeAll="removeAll"
          @change="changeAmount"
        />
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
        this.list[material.name].amount += material.amount;
      } else {
        this.$set(this.list, material.name, {});
        this.$set(this.list[material.name], 'amount', material.amount);
        this.$set(this.list[material.name], 'curAmount', 0);
      }
      appSettings.setString('list', JSON.stringify(this.list));
    },
    changeAmount({material, value}) {
      this.list[material].curAmount =
        value > this.list[material].amount
          ? this.list[material].amount
          : value >= 0
          ? value
          : 0;
      appSettings.setString('list', JSON.stringify(this.list));
    },
    removeOne(material) {
      this.$delete(this.list, material);
      appSettings.setString('list', JSON.stringify(this.list));
    },
    removeAll() {
      this.list = {};
      appSettings.setString('list', JSON.stringify(this.list));
    },
  },
};
</script>
