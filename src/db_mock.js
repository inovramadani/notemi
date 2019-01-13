export var data_db_mock = [
	{color: 'green', text: 'nice'}, 
	{color: 'blue', text: 'work!'}
]

const db = {
	get: () => {
		return new Promise ((resolve, reject) => (resolve(data_db_mock)))
	},
	doc: (docName) => {
		return {
			set: (new_data) => {
				data_db_mock = new_data
			}
		}
	}
}

export default db