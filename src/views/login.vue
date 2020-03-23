<template>
  <div class="login_box">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="账号" prop="userName">
        <Input v-model="formValidate.userName" style="width: 250px;"
               placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="密码" prop="userPwd">
        <Input v-model="formValidate.userPwd" type="password" style="width: 250px;"
               placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem>
       <Button type="primary" @click="login" style="width: 250px;">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {login} from '@/api';
  export default {
    name: "login",
    data() {
      return {
        formValidate: {
          userName: '',
          userPwd: ''
        },
        ruleValidate: {
          userName: [
            {required: true, message: '请输入账号'}
          ],
          userPwd: [
            {required: true, message: '请输入密码'}
          ]
        }
      }
    },
    methods: {
      login() {
        this.$refs.formValidate.validate(valid => {
          if (valid) {
            login({
              ...this.formValidate
            }).then((res) => {
              this.$Message.success('登录成功');
              let {name, avatar} = res.result;
              window.localStorage.setItem('name', name);
              window.localStorage.setItem('avatar', avatar);
              setTimeout(() => {
                this.$router.push('/');
              }, 1000)
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .login_box {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -130px;
    padding-top: 50px;
    width: 400px;
    height: 260px;
    background-color: #ffc777;
    border-radius: 6px;
  }
</style>
