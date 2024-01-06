import { Client, Account, Databases, Storage, Query, ID } from 'appwrite'
import conf from '../conf/conf';

export class AuthService {
    client = new Client();
    account;
    databases;
    user_id;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.user_id = this.createId();

    }

    createId() {
        const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-_';
        const userIdLength = 20;

        let uid = '';

        for (let i = 0; i < userIdLength; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            uid += validChars.charAt(randomIndex);
        }

        return uid;
    }


    async createAccount({ email, password, name }) {

        let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
        let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];
        let createImg = () => {
            return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
        }

        let username = email.split('@')[0];;
        let img = createImg();

        try {
            const userAccount = await this.account.create(this.user_id, email, password, name)
            if (userAccount) {

                this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdUser,
                    this.user_id,
                    {
                        fullname: name,
                        email: email,
                        username: username,
                        bio: "",
                        profile_img: img
                    }
                )
                    .then(dbRes => {
console.log("dbRes : ", dbRes);
                    })
                    .catch(err => {
                        console.log(err);
                    })


                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login({ email, password }) {


        try {
            let res = await this.account.createEmailSession(email, password);

            if (res) {
                return await this.getCurrentUser();;
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getCurrentUser() {
        try {
            let authUserData = await this.account.get();
            if(authUserData){
                let dbUserData = await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdUser,
                    authUserData.$id
                )
                if(dbUserData){
                    return { ...dbUserData, authUserData, status:authUserData.status }
                }
            } 
        } catch (error) {
            console.log(error);
            // console.log("Appwrite service :: getCurrentUser :: error", error);
            throw error
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }

}

const appwriteAuthService = new AuthService();
export default appwriteAuthService