<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
    <FormItem label="商品名称" prop="productName">
      <Input v-model="formValidate.productName" style="width: 450px;"></Input>
    </FormItem>
    <FormItem label="简介" prop="sub_title">
      <Input type="textarea" :rows="3" v-model="formValidate.sub_title" style="width: 450px;"></Input>
    </FormItem>
    <FormItem label="价格" prop="salePrice">
      <Input v-model="formValidate.salePrice" style="width: 450px;"></Input>
    </FormItem>
    <FormItem label="库存" prop="limit_num">
      <Input v-model="formValidate.limit_num" style="width: 450px;"></Input>
    </FormItem>
    <FormItem label="商品类别" prop="goodsType">
      <Select v-model="formValidate.goodsType" style="width:450px">
        <Option value="1">男</Option>
        <Option value="2">女</Option>
      </Select>
    </FormItem>
    <FormItem label="热门商品" prop="isHot">
      <Select v-model="formValidate.isHot" style="width:450px">
        <Option value="1">是</Option>
        <Option value="2">否</Option>
      </Select>
    </FormItem>
    <FormItem label="商品大图" prop="productImageBig">
      <div style="position: relative;display: inline-block;" v-show="formValidate.productImageBig">
        <img :src="formValidate.productImageBig" style="width: 60px;">
        <Icon type="ios-close-circle" size="20" @click="formValidate.productImageBig = ''"
              style="position: absolute;right: -10px;top: -10px;display: block;cursor:pointer;" />
      </div>

      <Upload
        ref="upload1"
        v-show="!formValidate.productImageBig"
        :show-upload-list="false"
        :format="['jpg','jpeg','png']"
        :on-format-error="handleFormatError"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </FormItem>
    <FormItem label="商品小图" prop="productImageSmall">
      <div v-for="(item, index) in formValidate.productImageSmall" style="display: inline-block;margin-right: 10px;">
        <div style="position: relative;">
          <img :src="item" style="width: 60px;">
          <Icon type="ios-close-circle" size="20" @click="delSmallImg(index)"
                style="position: absolute;right: -10px;top: -10px;display: block;cursor:pointer;" />
        </div>
      </div>
      <Upload
        ref="upload2"
        :show-upload-list="false"
        :format="['jpg','jpeg','png']"
        :on-format-error="handleFormatError"
        :before-upload="handleBeforeUpload1"
        type="drag"
        action="/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </FormItem>
    <FormItem label="商品详情" prop="detail">
      <div ref="detailRef"></div>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="submit" style="width: 250px;">提交</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {productDet, goodsUpdate, goodsAdd} from '@/api';
  import WangEditor from 'wangeditor';
  import wangEditorConfig from '@/utils/wangEditorConfig';

  export default {
    name: "goodsEdit",
    data() {
      return {
        formValidate: {
          productName: '',
          sub_title: '',
          salePrice: '',
          limit_num: '',
          goodsType: '1',
          isHot: '1',
          productImageBig: '',
          productImageSmall: [],
          detail: ''
        },
        ruleValidate: {
          productName: [
            {required: true, message: '请输入商品名称'}
          ],
          sub_title: [
            {required: true, message: '请输入商品简介'}
          ],
          salePrice: [
            {required: true, message: '请输入商品价格'}
          ],
          limit_num: [
            {required: true, message: '请输入商品库存'}
          ],
         /* productImageBig: [
            {required: true, message: '请上传大图'}
          ]*/
        },
        id: '',
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      if (this.id) {
        this.getDetail();
      } else {
        this.resetEditor()
      }
    },
    methods: {
      submit() {
        this.$refs.formValidate.validate(valid => {
          if (valid) {
            let params = {...this.formValidate};
            params.isHot = params.isHot == '1' ? true : false
            if (this.id) {
              params._id = this.id;
              goodsUpdate(params).then(() => {
                this.$Message.success('编辑成功');
                setTimeout(() => {
                  this.$router.push('/');
                }, 1000)
              })
            } else {
              goodsAdd(params).then(() => {
                this.$Message.success('新增成功');
                setTimeout(() => {
                  this.$router.push('/');
                }, 1000);
              })
            }
          }
        });
      },
      delSmallImg(index) {
        this.formValidate.productImageSmall.splice(index, 1);
      },
      getDetail() {
        productDet({productId: this.id}).then(res => {
          this.formValidate = res.result;
          this.formValidate.isHot = this.formValidate.isHot ? '1' : '2';
          this.resetEditor(this.formValidate.detail);
        })
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '只能上传jpg, jpeg, png格式图片'
        });
      },
      handleBeforeUpload (file) {
        let r = new FileReader();
        r.readAsDataURL(file);
        r.onload = (e) => {
          this.formValidate.productImageBig = e.target.result;
        };
        return false;
      },
      handleBeforeUpload1 (file) {
        if (this.formValidate.productImageSmall.length === 5) {
          this.$Message.error('最多上传5张');
          return false;
        }
        let r = new FileReader();
        r.readAsDataURL(file);
        r.onload = (e) => {
          this.formValidate.productImageSmall.push(e.target.result);
        };
        return false;
      },
      resetEditor(text) {
        var editor1 = new WangEditor(this.$refs.detailRef);
        wangEditorConfig(editor1);
        // 配置 onchange 事件
        editor1.customConfig.onchange = (html) => {
          var reg = new RegExp("&nbsp;", 'g'), text = editor1.txt.text(), len = text.replace(reg, ' ').length;
          if (html == '<p><br></p>') {
            this.formValidate.detail = '';
          } else {
            this.formValidate.detail = html;
          }
        };
        editor1.create();     // 生成编辑器
        if (text) {
          editor1.txt.html(text);
        }
      }
    }
  }
</script>

<style scoped>

</style>
