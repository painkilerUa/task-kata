<template>
  <div id="app" class="app">
    <div class="container">
      <div class="row" v-for="(order, key) in countedOrder">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <span>{{key }}</span>
          <span>{{order.value}}, pc</span>
          <span>{{order.total_price}}, cents</span>
        </div>
        <div class="col-lg-4"></div>
      </div>
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <span>Full cost:{{fullCost}}, cents</span>
        </div>
        <div class="col-lg-4"></div>
      </div>
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <span>Free items:{{freeItems}}, cents</span>
        </div>
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
              <label for="input-weight">Weight, g</label>
              <input type="text" class="form-control" id="input-weight" v-model.number="weightProduct">
            </div>
            <button type="submit" class="btn btn-default" @click.prevent="addProducts" :class="{disabled: !selectedProduct.id}">Add</button>
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
              sku: null,
              attr_id: null
          },
          weightProduct: null,
          order: [],
          countedOrder: {}
      }

  },
  methods: {
    requestToServer(urlEnd, type, payload = {}){
      if(type == 'get'){
        return Vue.http[type]('http://localhost:1444/' + urlEnd)
      }else{
        return Vue.http[type]('http://localhost:1444/' + urlEnd, payload)
      }
    },
    addProducts(){
        if(!this.selectedProduct.id) return
        let selectedProduct = this.selectedProduct;
        if(this.selectedProduct.attr_id == 2) selectedProduct.weight = this.weightProduct
      this.order.push(selectedProduct);
      this.requestToServer('order', 'post', this.order).then(
          res => {
              this.countedOrder = res.body
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
  computed: {
      fullCost(){
          let fullCost = 0;
          for (let key in this.countedOrder){
            fullCost += this.countedOrder[key]['total_price']
          }
        return fullCost;
    },
      freeItems(){
          let freeItems = [];
          for (let key in this.countedOrder){
              if(this.countedOrder[key]['free_item_sku']){
                  freeItems.push(this.countedOrder[key]['free_item_sku']);
              }
          }
          return freeItems.join(',')
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
