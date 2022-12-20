export var data_db_mock = [
	{color: 'green', text: 'nice'}, 
	{color: 'blue', text: 'work!'}
]

var querySnapshot = data_db_mock.map(record => (
	{
		doc: {
			id: 'user1',
			data: () => (record)
		}
	}
))

const db = {
	get: () => {
		return new Promise ((resolve, reject) => (resolve(querySnapshot)))
	},
	doc: (docName) => {
		return {
			set: (new_data) => {
				return new Promise ((resolve, reject) => { 
					data_db_mock = new_data
					resolve() 
				})
			}
		}
	}
}

export default db