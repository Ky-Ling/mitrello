import { Client, ID, Databases, Storage, Account } from 'appwrite';

const client = new Client();

client
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, databases, storage, client, ID };
