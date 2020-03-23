<template>
  <div class="goods_manager">
    <Button type="primary" style="margin-bottom: 20px;" @click="addGoods">新增</Button>
    <Table :columns="columns1" :data="data1"></Table>
    <div class="page_box">
      <Page :total="total" :current.sync="pageNo" show-elevator @on-change="getList" show-total />
    </div>
  </div>
</template>

<script>
  import {goodsList, productDel, productUpDown} from "@/api";

  export default {
    name: "goodsManager",
    data() {
      return {
        columns1: [
          {
            title: '序号',
            type: 'index',
            width: 80
          },
          {
            title: '商品名称',
            key: 'productName',
            width: 380
          },
          {
            title: '商品价格',
            key: 'salePrice'
          },
          {
            title: '商品数量',
            key: 'limit_num'
          },
          {
            title: '操作',
            width: 160,
            render: (h, params) => {
              let isUp = params.row.isUp;
              return h('div', {}, [
                h('span', {
                  style: {
                    display: 'inline-block',
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.toEditGoods(params.row._id);
                    }
                  }
                }, '编辑'),
                h('span', {
                  style: {
                    display: 'inline-block',
                    marginLeft: '20px',
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.upDownGoods(params.row._id, isUp);
                    }
                  }
                }, isUp ? '下架' : '上架'),
                h('span', {
                  style: {
                    display: 'inline-block',
                    marginLeft: '20px',
                    color: 'red',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.delGoods(params.row._id);
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: [],
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        goodsList({
          page: this.pageNo,
          pageSize: this.pageSize,
          all: '1'
        }).then(res => {
          this.data1 = res.result.data;
          this.total = res.result.total;
        })
      },
      addGoods() {
        this.$router.push('/goodsEdit');
      },
      toEditGoods(_id) {
        this.$router.push('/goodsEdit?id=' + _id);
      },
      //上下架商品
      upDownGoods(_id) {
        productUpDown({_id}).then(() => {
          this.$Message.success('操作成功');
          this.getList();
        })
      },
      //删除商品
      delGoods(_id) {
        this.$Modal.confirm({
          title: '提示框',
          content: '确定删除吗?',
          onOk: () => {
            productDel({_id}).then(() => {
              this.$Message.success('删除成功');
              this.pageNo = 1;
              this.getList();
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .goods_manager {

  }
</style>
