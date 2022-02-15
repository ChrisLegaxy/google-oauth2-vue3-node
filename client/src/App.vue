<script>
import axios from "axios";

export default {
  data: () => ({
    user: ""
  }),
  methods: {
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        this.user = googleUser.getBasicProfile().getEmail();
        console.log(this.$gAuth.instance.currentUser.get().getAuthResponse());
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickGetAuthCode() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<script setup>
import { inject, onMounted, getCurrentInstance } from "vue";

/**
 * * Vue3 Google OAuth Plugin
 */
const Vue3GoogleOauth = inject("Vue3GoogleOauth");
const gAuth = getCurrentInstance().appContext.config.globalProperties.$gAuth;

const handleGetOwnAPIResource = async () => {
  try {
    const response = await axios.get("http://localhost:8000", {
      headers: {
        authorization: `Bearer ${gAuth.instance.currentUser.get().wc.id_token}`,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserInfo = async () => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          authorization: `Bearer ${
            gAuth.instance.currentUser.get().wc.access_token
          }`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

onMounted(async () => {
  /**
   * * Interval Wating Until Vue3GoogleOAuth is initialized
   */
  let checkGauthLoad = await setInterval(function () {
    if (Vue3GoogleOauth.isInit) {
      clearInterval(checkGauthLoad);
      // do more stuff
    }
  }, 500);
});
</script>

<template>
  <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
  <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
  <h2 v-if="user">signed user: {{ user }}</h2>
  <button
    class="btn mx-1"
    @click="handleClickSignIn"
    :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized"
  >
    Sign In
  </button>
  <button
    class="btn mx-1"
    @click="handleClickGetAuthCode"
    :disabled="!Vue3GoogleOauth.isInit"
  >
    Get AuthCode
  </button>
  <button
    class="btn mx-1"
    @click="handleClickSignOut"
    :disabled="!Vue3GoogleOauth.isAuthorized"
  >
    Sign Out
  </button>
  <button
    class="btn mx-1"
    @click="getUserInfo"
    :disabled="!Vue3GoogleOauth.isAuthorized"
  >
    Get Profiles from Google
  </button>
  <button
    class="btn mx-1"
    @click="handleGetOwnAPIResource"
    :disabled="!Vue3GoogleOauth.isAuthorized"
  >
    Get Own API Resource
  </button>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
