import { ProductInterface } from "../../interfaces/product.interface" 
import { Customer } from "../models/Customer.model"
import { Adress } from "../models/Adress.model"
export class CustomerRepository{

    async createCustomer({email,password,phone,salt}:CustomerInterface){
        try{
            const customer = new Customer({
                email,
                password,
                salt,
                phone,
                adress:[]
            })
            const customerResult = await customer.save()
            return customerResult;
        }
        catch(error){
            return error;
        }
    }

    async createAdress({ _id, street, postalCode, city, country }: AdressInterface){
        const profile = await Customer.findById(_id);

        if(profile){
            const newAddress = new Adress({
                street,
                postalCode,
                city,
                country
            })

            await newAddress.save();

            profile.address.push(newAddress);
        }
    }

    async FindCustomer({ email }:{email:string}) {
        const existingCustomer = await Customer.findOne({ email: email });
        return existingCustomer;
    }

    async FindCustomerById({ id }:{id:string}) {

        const existingCustomer = await Customer.findById(id).populate('address');
        
        return existingCustomer;
    }

    async Wishlist(customerId:string) {

        const profile = await Customer.findById(customerId).populate('wishlist');

        return profile.wishlist;
    }

    async AddWishlistItem(customerId:string, { _id, name, desc, price, available, banner }:ProductInterface) {

        const product = {
            _id, name, desc, price, available, banner
        };

        const profile = await Customer.findById(customerId).populate('wishlist');

        if (profile) {

            let wishlist = profile.wishlist;

            if (wishlist.length > 0) {
                let isExist = false;
                wishlist.map((item:any) => {
                    if (item._id.toString() === product._id.toString()) {
                        const index = wishlist.indexOf(item);
                        wishlist.splice(index, 1);
                        isExist = true;
                    }
                });

                if (!isExist) {
                    wishlist.push(product);
                }

            } else {
                wishlist.push(product);
            }

            profile.wishlist = wishlist;
        }

        const profileResult = await profile.save();

        return profileResult.wishlist;
    }

    async AddCartItem(customerId:string, { _id, name, price, banner }:ProductInterface, qty:any, isRemove:any) {


        const profile = await Customer.findById(customerId).populate('cart');


        if (profile) {

            const cartItem = {
                product: { _id, name, price, banner },
                unit: qty,
            };

            let cartItems = profile.cart;

            if (cartItems.length > 0) {
                let isExist = false;
                cartItems.map((item:any) => {
                    if (item.product._id.toString() === _id.toString()) {

                        if (isRemove) {
                            cartItems.splice(cartItems.indexOf(item), 1);
                        } else {
                            item.unit = qty;
                        }
                        isExist = true;
                    }
                });

                if (!isExist) {
                    cartItems.push(cartItem);
                }
            } else {
                cartItems.push(cartItem);
            }

            profile.cart = cartItems;

            return await profile.save();
        }

        throw new Error('Unable to add to cart!');
    }



    async AddOrderToProfile(customerId:string, order:any) {

        const profile = await Customer.findById(customerId);

        if (profile) {

            if (profile.orders == undefined) {
                profile.orders = []
            }
            profile.orders.push(order);

            profile.cart = [];

            const profileResult = await profile.save();

            return profileResult;
        }

        throw new Error('Unable to add to order!');
    }
}