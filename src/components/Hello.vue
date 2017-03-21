<template>
  <div class="container">
    <div class="list-group" v-for="art in article">
      <router-link :to="{ path: '/view', params: { articleId: art.id }}">
      <h4 class="list-group-item-heading">
        {{art.title}}
      </h4>
      </router-link>
        <p class="list-group-item-text">
          {{art.content}}
        </p>

    </div>
    <ul class="paginate">
     <button @click="next">next</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
        articles:[],
        current_page:1,
        pre_page:0,
        next_page:0,
        total_page:0,
        per:10,
        article:[],

    }

  },
    methods:{
      logout(){
          window.localStorage.removeItem('user')
          this.$router.push('/login')
      },
        next(){
          this.current_page+=1
            this.pre_page+=1
        }
    },
    created(){
      this.$http.get('http://127.0.0.1/api/get_all_articles')
          .then(response=>{
              this.articles=response.data
              this.total_page=this.articles.length/this.per;
              this.articles.forEach((e,index)=>{
                  if(index<this.per){
//                     console.log(e)

                      this.article.push(e)
//                      console.log(this.article)
                  }
              })
          });
//      console.log(this.$route.params.articleId)

    },
    watch:{
        current_page(val){
            this.article=[]
            this.articles.forEach((e,index)=>{
                if(index<this.current_page*this.per){
                    if(index>this.pre_page*this.per){
//                        console.log(e)

                        this.article.push(e)
                    }


                }
            })
        }
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
