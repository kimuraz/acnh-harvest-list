<template>
  <Page>
    <ActionBar title="About" class="light-bg">
      <ActionItem
        ios.position="right"
        android.position="popup"
        text="Settings"
        @tap="$navigateTo(aboutPage)"
      />
    </ActionBar>
    <StackLayout class="blue-bg container">
      <Label class="h1" text="About" />

      <Label
        text="This is an open-source app and anyone can contribute, check our repo: https://github.com/kimuraz/acnh-harvest-list"
      />

      <Label class="h2" text="Icons attributions" />

      <Label
        text="Freepik at flaticon.com (https://www.flaticon.com/authors/freepik)"
      />
    </StackLayout>
  </Page>
</template>

<script>
export default {
  name: 'About',
};
</script>
