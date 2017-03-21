<template>
  <div class="container">
    <form class="form-horizontal" role="form" v-on:submit.prevent>
      <div class="form-group">
        <label for="email" class="col-sm-2 control-label">Email:</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="email" placeholder="请输入Email" v-model="email">
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-2 control-label">Password:</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="passwrod" placeholder="请输入Password" v-model="password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label>
              <input type="checkbox">请记住我
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary" @click="onSubmit">登录</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
      name:'Login',
      data () {
          return {
              email:"",
              password:""
          }
      },
      methods:{
          onSubmit (){
              const postData={
                  email:this.email,
                  password:this.password
              }

              const check=this.Check()
              if (check==true){
                this.$http.post('http://127.0.0.1/api/sign',postData)
                  .then(response=>{
                    if(response.body.status=='200'){
                        window.localStorage.setItem('user',JSON.stringify(response.body.userInfo))
                      this.$router.push('/');
                    }
                  })
              }else{
                  alert('sorry')
              }



          },
        Check () {
              const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
              if (this.email!=""&&this.password!=""){
                  if(re.test(this.email)&&this.password.length>6){
                      return true;
                  }else{
                      return false;
                  }
              }
        }



      }




  }




</script>

<style scoped>
  /*@import "../assets/css/style.css";*/
</style>
