import envVariables from '../envVar/envVar'
import { Account, Client, ID } from 'appwrite';

export class AuthService {

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(envVariables.appwriteUrl)
            .setProject(envVariables.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            }
        } catch (error) {
            console.log('Appwrite Service :: createAccount() :: error', error);
            return error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log('Appwrite Service :: login() :: error', error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            // console.log('Appwrite Service :: getCurrentUser() :: error', error);
            // throw error
            
        }

        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite Service :: logout() :: error', error);
        }
    }
}

const authService = new AuthService();

export default authService