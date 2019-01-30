<template>
  <div class="topMenu">
    <a class='logo' href="/vue"><img src="../../../assets/logo.png"  width="370"/></a>
    <div class="right-menu">
      <el-button  @click.native="open('http://47.100.12.43:8080/help/ssoLogin?redirectUrl=http://47.100.12.43:8080/help/form.action ')">
      我要提问</el-button>
      <el-button  @click.native="open('http://kms.zldcgroup.com/kms/knowledge/#j_path=%2FdocCategory&docCategory=164e8d64cf5d8cc93b852d04c3599358')">
        知识管理</el-button>
      <template v-if="device!=='mobile'">
      </template>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <div class="user-n"><svg-icon icon-class="user" /><i>Welcome !</i>{{$store.state.user.name}}</div>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SizeSelect from '@/components/SizeSelect'

  export default {
    name: "TopMenu",
    components: {
      SizeSelect,
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
       /* 'avatar',*/
        'device'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          this.$router.push({ path: '/login' })
        })
      },
      open(a){
        window.open(a)
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .topMenu{
    height:80px;
    background:#409eff ;
    position:relative;
    a{
      display: inline-block;
      padding-top:20px
    }
    .right-menu {
      float: right;
      height: 100%;
      .el-button{
        color: #fff;
        background: #409eff;
        margin-right: 20px;
      }
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
           .user-n{
             display:inline-block;
             height:80px;
             color:#fff;
             line-height:80px;
             padding-left:40px;
             position: relative;
             font-size:16px;
             i{
               text-decoration: none;
               font-weight:600;
               font-style:normal;
               display:none;
             }
             .svg-icon{
               width:30px;
               height:30px;
               position:absolute;
               top:50%;
               left:0;
               margin:-15px 0 0 0;
               display:none;
             }
           }
          .el-icon-caret-bottom {
            position: absolute;
            right: -18px;
            top: 33px;
            font-size: 12px;
            color:#fff;
          }
        }
      }
    }
  }
</style>
