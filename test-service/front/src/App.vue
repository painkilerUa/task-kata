<template>
  <div id="app" class="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4"></div>
        <div class="col-lg-4"></div>
      </div>
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <form>
            <div class="form-group">
              <select class="custom-select" @change="selectProduct($event.target.value)">
                <option selected >Select your product</option>
                <option :value="product.id" v-for="product in products">{{product.sku}}</option>
              </select>
            </div>
            <div class="form-group" v-show="selectedProduct.attr_id == 2">
              <label for="input-weight">Weight</label>
              <input type="text" class="form-control" id="input-weight" >
            </div>
            <button type="submit" class="btn btn-default" @click.prevent="addProducts">Add</button>
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
  data() {
      return {
          products: [],
          selectedProduct: {
              id: null,
              weight: null,
              attr_id: null
          },
          order: []
      }

  },
  methods: {
    requestToServer(urlEnd, type, payload = {}){
      if(type == 'get'){
        return Vue.http[type]('http://localhost:8444/' + urlEnd)
      }else{
        return Vue.http[type]('http://localhost:8444/' + urlEnd, payload)
      }
    },
    addProducts(){
      this.order.push(this.selectedProduct);
      this.requestToServer('order', 'post', this.order).then(
          res => {
              console.log('res', res)
          }
      ).catch((err) => {
          console.log(err)
      })

    },
      selectProduct(id){
        console.log('option changed', id)
        this.selectedProduct = this.products.find(item => item.id == id)
      }
  },
  created(){
      console.log('hook created')
    this.requestToServer('products', 'get').then(
        res => {
            this.products = res.body
        }
    ).catch((err) => {
      console.log(err)
    })

  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  .app{
    margin-top: 50px;
  }
</style>
