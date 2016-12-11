module.exports = {
    cart: [],
    init: function (cart) {
        this.cart = cart;
    },
    add: function (data, callback) {
        this.cart.push(
                {
                    id: this.cart.length + 1,
                    title: data.title,
                    price: data.price,
                    date: (new Date()).toLocaleDateString()
                }
        );
        callback();
    },
    update: function (data, callback) {
        for (var i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === parseInt(data.id)) {
                this.cart[i].title = data.title;
                this.cart[i].price = data.price;
                break;
            }
        }
        callback();
    },
    get: function (callback) {
        if (this.cart === undefined) {
            this.cart = [];
            this.cart.push({title: 'Java', price: 56.7, date: '3/15/2016'});
            this.cart.push({title: 'JavasSript', price: 56.7, date: '3/15/2015'});
            this.cart.push({title: 'PHP', price: 56.7, date: '3/15/2014'});
        }
        callback(this.cart);
    },
    remove: function (id, callback) {
        for (var i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === id) {
                this.cart.splice(i, 1);
                break;
            }
        }
        callback();
    }
};