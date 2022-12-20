// rename this file to be firebase.js to implement the mocking effect

export var data_db_mock = [
	{color: 'green', text: 'nice'}, 
	{color: 'blue', text: 'work!'}
]

const firebase = {
	initializeApp: () => {},
	firestore: () => {
		return {
			settings: (settings) => {},
			collection: (col_name) => {
				return {
					get: () => {
						return new Promise ((resolve, reject) => (resolve(data_db_mock)));
					},
					doc: (doc_name) => {
						return {
							set: (new_data) => {
								data_db_mock = new_data
							}
						}
					}
				}
			}
		}		
	}
}

export default firebase