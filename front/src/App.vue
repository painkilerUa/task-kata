<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <form>
            <div class="form-group">
              <label for="login-email">Login</label>
              <input type="text" class="form-control" id="login-email" placeholder="Login" >
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <input type="password" class="form-control" id="login-password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-default">Войти</button>
          </form>
        </div>
        <div class="col-lg-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
  name: 'app',
  methods: {
    requestToServer(urlEnd, type, payload = {}){
      if(type == 'get'){
        return Vue.http[type]('http://localhost:3302/' + urlEnd)
      }else{
        return Vue.http[type]('http://localhost:3302/' + urlEnd, payload)
      }
    }
  },
  created(){
    requestToServer('products', 'get').then(
        res => {
            console.log('res', res)
        }
    ).catch((err) => {
      console.log(err)
    })

  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
</style>
