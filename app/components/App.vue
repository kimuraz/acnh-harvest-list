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
        <MaterialsList />
      </TabViewItem>
      <TabViewItem title="Furniture">
        <GridLayout columns="*" rows="*">
          <Label class="message" text="Tab 2 Content" col="0" row="0" />
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Harvest list">
        <GridLayout columns="*" rows="*">
          <Label class="message" text="Tab 3 Content" col="0" row="0" />
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import MaterialsList from './MaterialsList';
export default {
  components: {
    MaterialsList,
  },
  data() {
    return {
      msg: 'Hello World!',
    };
  },
};
</script>

<style scoped>
ActionBar {
  color: #ffffff;
}
</style>
