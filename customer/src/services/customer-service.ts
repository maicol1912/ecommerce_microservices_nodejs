import { CustomerRepository } from "../database/repository/customer-repository";
import { ProductInterface } from "../interfaces/product.interface";
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');


export class CustomerService {
    repository:any 

    constructor() {
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs:any) {

        const { email, password } = userInputs;

        const existingCustomer = await this.repository.FindCustomer({ email });

        if (existingCustomer) {

            const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
            if (validPassword) {
                const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
                return FormateData({ id: existingCustomer._id, token });
            }
        }

        return FormateData(null);
    }

    async SignUp(userInputs:any) {

        const { email, password, phone } = userInputs;

        // create salt
        let salt = await GenerateSalt();

        let userPassword = await GeneratePassword(password, salt);

        const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, salt });

        const token = await GenerateSignature({ email: email, _id: existingCustomer._id });
        return FormateData({ id: existingCustomer._id, token });

    }

    async AddNewAddress(_id:string, userInputs:any) {

        const { street, postalCode, city, country } = userInputs;

        const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country })

        return FormateData(addressResult);
    }

    async GetProfile(id:string) {

        const existingCustomer = await this.repository.FindCustomerById({ id });
        return FormateData(existingCustomer);
    }

    async GetShopingDetails(id:string) {

        const existingCustomer = await this.repository.FindCustomerById({ id });

        if (existingCustomer) {
            return FormateData(existingCustomer);
        }
        return FormateData({ msg: 'Error' });
    }

    async GetWishList(customerId:string) {
        const wishListItems = await this.repository.Wishlist(customerId);
        return FormateData(wishListItems);
    }

    async AddToWishlist(customerId:string, product:ProductInterface) {
        const wishlistResult = await this.repository.AddWishlistItem(customerId, product);
        return FormateData(wishlistResult);
    }

    async ManageCart(customerId:string, product:ProductInterface, qty:any, isRemove:any) {
        const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);
        return FormateData(cartResult);
    }

    async ManageOrder(customerId:string, order:any) {
        const orderResult = await this.repository.AddOrderToProfile(customerId, order);
        return FormateData(orderResult);
    }

    async SubscribeEvents(payload:any) {

        console.log('Triggering.... Customer Events')

        payload = JSON.parse(payload)

        const { event, data } = payload;

        const { userId, product, order, qty } = data;

        switch (event) {
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId, product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, product, qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId, order);
                break;
            default:
                break;
        }

    }

}

