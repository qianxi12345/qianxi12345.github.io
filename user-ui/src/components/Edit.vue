<template>
    <div class="container " style=" width: 800px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 4px">
      <h2 class="page-header" style="text-align: center;margin-top: 30px;">编辑用户</h2>
      <router-link to="/"> <el-button style="float:right ; " type="primary" plain>返回</el-button></router-link>
      <el-radio-group v-model="labelPosition" size="small" >
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
        <div style="margin: 20px;"></div>
          <el-form ref="adds"  :label-position="labelPosition" :rules="rules" label-width="80px" :model="adds">
            <el-form-item prop="name" label="用户名">
              <el-input v-model="adds.name" placeholder="请填写用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Pass">
              <label slot="label">密&nbsp;&nbsp;&nbsp;码</label>
              <el-input type="password" v-model="adds.Pass" placeholder="请填写密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="adds.checkPass" placeholder="请填写确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="联系电话" >
              <el-input type="number"  v-model="adds.phone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮  箱">
              <label slot="label">邮&nbsp;&nbsp;&nbsp;箱</label>
              <el-input  v-model="adds.email" placeholder="请填写邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="age" label="年龄" >
              <label slot="label">年&nbsp;&nbsp;&nbsp;龄</label>
              <el-input type="number"  v-model="adds.age" placeholder="请填写年龄"></el-input>
            </el-form-item>
            <el-form-item prop="interest" label="兴趣爱好">
              <el-input type="textarea" v-model="adds.interest" placeholder="请填写兴趣爱好"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary"  @click="editsubmit" >确认编辑</el-button>
              <el-button @click="resetForm('adds')">重置表单</el-button>
            </el-form-item>
  
          </el-form>
        </div>
  </template>
  <script>
  import axios from 'axios'
    export default {
    name:'customer',
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.adds.checkPass !== '') {
              this.$refs.adds.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.adds.Pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          rules:{
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2,required: true, trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '电话不能为空'},
              { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
              
            ],
            email: [
              { required: true, message: '邮箱不能为空'},
              { type:"email", message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            age: [
              // { required: true, message: '年龄不能为空'},
              { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
            ],
            interest: [
              // { required: true, message: '请输入兴趣爱好', trigger: 'blur' },
              { min: 10, max: 100, message: '长度在 10 到 100个字符', trigger: 'blur' }
            ],
            
          },
          labelPosition: 'right',
          adds: {
            name: '',
            Pass:'',
            checkPass:'',
            phone: '',
            email:'',
            age:'',
            interest:'',
            brand:''
          }
        }
      },
      methods: {
        // 存储用户信息
        fetchCustomer(id){
            axios.get("http://localhost:3000/users/"+id)
           .then((response)=>{
            console.log(response);
            this.adds=response.data;
           })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        editsubmit(index){
        if( !this.adds.name || !this.adds.phone || !this.adds.email 
        || !this.adds.checkPass || !this.adds.Pass){
          this.$message({
                        message: '请填写必填项内容!',
                        type: 'error',
                    });
        }else{
            let newAdds={
              name:this.adds.name,
              Pass:this.adds.Pass,
              checkPass:this.adds.checkPass,
              phone:this.adds.phone,
              email:this.adds.email,
              age:this.adds.age,
              interest:this.adds.interest,
              brand:this.adds.brand,
            }
            if(newAdds){
              this.$confirm('是否编辑该用户', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type:'warning'})
                  .then(()=>{
                      axios.put("http://localhost:3000/users/"+this.$route.params.id,newAdds)
                      .then((response)=>{
                        this.$router.push({path:'/'})
                        this.$message({
                        message: '用户更新成功!',
                        type: 'success',
                    });
                  })
              })
            } 
          }
        }
      },
      created(){
        // 返回到fetchCustomer
        this.fetchCustomer(this.$route.params.id)
      }
     
    }
  </script>
  
  <style>
  /* a{
  
  } */
  </style>