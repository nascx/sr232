import { db } from "../config/db";

export const searchForCollaboratorByRegistration = async (id: any ) => {
    try {
        return new Promise((resolve, reject) => {
            const q = 'SELECT name FROM colab WHERE id = ?';
            db.query(q, [id], (err, data) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else if (data && data.length > 0) {
                    console.log(data[0].name)
                    resolve({name: data[0].name}); // Return collaborator name
                } else {
                    console.log('No collaborator found')
                    reject({message: 'No Collaborator found'}); // No collaborator found
                }
            });
        });
    } catch (error) {
        throw error
    }
};

