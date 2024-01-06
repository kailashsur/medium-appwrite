import { Client, Databases, ID } from "appwrite";

export const createUserInDB = () => {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('<PROJECT_ID>');

    const databases = new Databases(client);

    const promise = databases.createDocument(
        '[DATABASE_ID]',
        '[COLLECTION_ID]',
        ID.unique(),
        {}
    );

    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

}