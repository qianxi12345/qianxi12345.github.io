<template>
    <div class="particulars container">
    <h2 class="page-header">个人信息    
       
     <el-button style="float:right;"  @click="btndelete(customer.id)" type="danger" plain><i class="el-icon-delete"></i> 删除信息</el-button>

        <router-link :to="'/edit/'+customer.id"> 
            <el-button style="float:right;margin-right: 20px;" type="primary" plain><i class="el-icon-edit"></i> 编辑信息</el-button>
        </router-link>
        <router-link to="/"> 
            <el-button style="float:right;margin-right: 20px;" type="primary" plain>返回</el-button>
        </router-link>

      
    </h2>
        <!-- <marguee behavior="scroll" direction="left" scrollamount="2" height="100" width="400" >22</marguee>  -->
            <el-card shadow="always"  style="width: 100%; height: 500px; ">
                <el-descriptions  column="2"  style=" margin-top: 10px;font-size: 16px;" title="用户信息">
                    <el-descriptions-item>
                    <template slot="label"><i class="el-icon-user"></i>用户名</template>
                        {{ customer.name }}
                    </el-descriptions-item>
  
                    <el-descriptions-item>
                    <template slot="label"><i class="el-icon-mobile-phone"></i>手机号</template>
                    {{ customer.phone }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template slot="label"><i class="el-icon-tickets"></i>邮箱</template>
                    {{ customer.email }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template slot="label"><i class="el-icon-tickets"></i>年龄</template>
                    {{ customer.age }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template slot="label"><i class="el-icon-tickets"></i>密码</template>
                    {{ customer.checkPass }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                    <template slot="label"><i class="el-icon-tickets"></i>兴趣爱好</template>
                    {{ customer.interest }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>    
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'particulars',
    data () {
      return {
        customer:"",
      }
    },
    methods:{
        btndelete(id){
            this.$confirm('是否删除该用户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'})
                .then(()=>{
                    axios.delete("http://localhost:3000/users/"+id)
                    .then((response)=>{
                        this.$router.push({path:'/'})
                        this.$message({
                            message: '用户删除成功!',
                            type: 'success',
                        });
                    })
                })
            
        },
        // 更多信息
        user(id){
            axios.get("http://localhost:3000/users/"+id)
            .then((response)=>{
            // console.log(response);
            this.customer=response.data
            })
        }
    },
    created(){
        this.user(this.$route.params.id);
    }
  }
  </script>

  <style scoped>
a{

}
  </style>
  