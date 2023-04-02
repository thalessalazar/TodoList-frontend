
<template></template>

<script>
import Cookie from "@/service/cookie";

export default {
  name: "logout",

  beforeRouteEnter(to, from, next) {
    Cookie.deleteToken();

    next({name: "login"});
  },
};
</script>
