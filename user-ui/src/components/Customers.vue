<template>
    <div class="customers container">
      <h1 class="page-header">用户管理系统</h1>
      <el-input placeholder="请输入搜索内容"
    prefix-icon="el-icon-search"
    v-model="filterInput">
  </el-input>
  
      <Alert v-if="alert" :message="alert"></Alert>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>用户名</th>
            <th>电话</th>
            <th>邮箱</th>
            <ht></ht>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer,index) in filterBy(customers,filterInput)" :key="index">
            <td>{{ customer.name }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
            <td> 
              <router-link :to="'particulars/'+customer.id">
                <el-button style=" margin-right:-70px ;" type="info" plain>更多信息</el-button>
              </router-link> 
            </td>
            <!-- <td> 
              <router-link :to="''+customer.id">
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </router-link> 
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import Alert from './Alert'
  import axios from 'axios';
  export default {
    name: 'customers',
    data () {
      return {
        customers:[],
        alert:'',
        filterInput:'',
        loading: true

      }
    },
    methods:{
      // 搜索
      filterBy(customers,value){
                    return customers.filter(function(customer){
                    return customer.name.match(value);
                })
      },
      // 读取数据
      user(){
        axios.get("http://localhost:3000/users")
        .then((response)=>{
          // console.log(response);
          this.customers=response.data
        })
    }
  },
  created(){
    // 弹窗用不到
    if(this.$route.query.alert){
      this.alert=this.$route.query.alert
    }
    this.user();
  },
  components:{
    Alert
  }
  
}
  </script>

  <style scoped>

  </style>
  