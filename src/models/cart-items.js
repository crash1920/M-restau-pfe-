class CartItem {
    constructor(quantity, productPrice, productTitle, sum,id_default_image,desc) {
      this.quantity = quantity;
      this.productPrice = productPrice;
      this.productTitle = productTitle;
      this.sum = sum;
      this.id_default_image = id_default_image;
      this.desc =desc ; 
    }
  }
  
  export default CartItem;
  