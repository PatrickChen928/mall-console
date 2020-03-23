<template>
  <div class="framework_layout">
    <div class="left_menu_box">
      <div class="logo_box">
        <img src="/static/img/logo.jpg" alt="" style="border-radius: 50%;">
        <h2>服装管理后台</h2>
      </div>
      <Menu :active-name="activeMenu" theme="dark" width="auto" @on-select="selectMenu" :openNames="routeNames"
            accordion>
        <Submenu v-for="(item, index) in menuList" :key="index" v-if="item.children" :name="item.name">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>{{item.name}}
          </template>
          <MenuItem v-for="(child, cIndex) in item.children" :name="child.route" :key="cIndex">{{child.name}}
          </MenuItem>
        </Submenu>
        <MenuItem :name="item.route" v-else>
          <i class="iconfont" :class="item.icon"></i>{{item.name}}
        </MenuItem>
      </Menu>
    </div>
    <div class="right_content_box">
      <div class="top_header">
        <div class="userInfo">
          <!--<Avatar class="user-avatar" icon="ios-person"/>-->
          <img :src="avatar" alt="" style="margin-top: 5px;width: 40px;height: 40px;border-radius: 50%;">
          <Dropdown trigger="hover" @on-click="logoutEvent">
            <span class="name">{{userInfoName}}</span>
            <DropdownMenu style="display: block" slot="list">
              <DropdownItem>
                退出登录
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="crumb_box">
          <i class="iconfont icon-zhuye"></i>当前位置：
          <ul class="route_list">
            <li v-for="(item, index) in routeNames" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="content_box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginOut} from '@/api';
  export default {
    name: 'framework',
    data() {
      return {
        userInfoName: '',
        avatar: '',
        activeMenu: '',
        routeNames: [],
        menuList: [
          {
            name: '商品管理',
            route: '',
            icon: 'icon-peizhi',
          }
        ]
      }
    },
    watch:{
      '$route':function(){
        this.getMenuRoute()
      }
    },
    created() {
      this.userInfoName = window.localStorage.getItem('name');
      this.avatar = window.localStorage.getItem('avatar');
      this.getMenuRoute();
    },
    methods: {
      getMenuRoute(){
        let route = this.$route.path.split('/')[1]
        let routeNames = []
        this.menuList.forEach(e => {
          routeNames = [e.name]
        });
        this.routeNames = routeNames;
        this.activeMenu = route;
      },
      selectMenu(name) {
        this.activeMenu = name;
        this.$router.push('/' + name);
      },
      logoutEvent() {
        loginOut().then(res => {
          window.localStorage.removeItem('name');
          window.localStorage.removeItem('avatar');
          this.$router.push('/login');
        });
      }
    }
  }
</script>

<style lang="less">
  .framework_layout {
    position: relative;
    .left_menu_box {
      position: fixed;
      left: 0;
      top: 0;
      width: 320px;
      height: 100vh;
      background-color: #001529;
      .logo_box {
        margin-bottom: 24px;
        width: 100%;
        height: 88px;
        background-color: #fff;
        img {
          margin-top: 16px;
          margin-left: 32px;
          height: 52px;
        }
        h2 {
          display: inline-block;
          vertical-align: top;
          margin-left: 12px;
          margin-top: 28px;
          line-height: 32px;
          font-size: 28px;
          color: #313236;
        }
      }
    }
    .right_content_box {
      padding-left: 320px;
      width: 100%;
      height: 100vh;
      .top_header {
        position: fixed;
        top: 0;
        left: 320px;
        right: 0;
        height: 88px;
        background-color: #fff;
        z-index: 1000;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        .userInfo {
          float: right;
          display: flex;
          padding-right: 60px;
          padding-top: 16px;
          color: #333;
          cursor: pointer;
          .user-avatar {
            width: 48px;
            height: 48px;
            line-height: 48px;
            .ivu-icon {
              font-size: 28px;
            }
          }
          .name {
            font-size: 20px;
            line-height: 48px;
            padding-left: 12px;
          }
        }
      }
      .wrapper {
        padding: 114px 32px 26px;
        box-sizing: border-box;
        .crumb_box {
          font-size: 14px;
          line-height: 14px;
          color: #999;
          .iconfont {
            margin-right: 8px;
            font-size: 14px;
          }
          .route_list {
            margin-left: 4px;
            display: inline-block;
            vertical-align: top;
            li {
              display: inline-block;
              &:not(:last-of-type) {
                &:after {
                  content: '/';
                  display: inline-block;
                  margin-left: 8px;
                  margin-right: 3px;
                }
              }
              &:last-of-type {
                color: #333;
              }
            }
          }
        }
        .content_box {
          margin-top: 10px;
          min-height: 60vh;
          padding: 20px;
          background-color: #fff;
          border-radius: 4px;
        }
      }
    }
  }
</style>
