<template>
  <div class="container">
    <div class="login">
      <h1 class="login-heading">
        <strong>Welcome.</strong> Please login.</h1>
      <form v-on:click.submit.prevent>
        <input type="text"  name="email" placeholder="Email" required="required" class="input-txt" v-model.trim="email" />
        <input type="password" name="password" placeholder="Password" required="required" class="input-txt"  v-model.trim="password"/>
        <div class="login-footer">
          <a href="#" class="lnk">
            <span class="icon icon--min">ಠ╭╮ಠ</span>
            I've forgotten something
          </a>
          <button type="submit" class="btn btn--right" v-on:click="onSubmit" >Sign in  </button>

        </div>
      </form>
    </div>
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
  @import "../assets/css/style.css";
</style>
