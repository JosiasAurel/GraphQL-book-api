
# GraphQL books API

This a minimal books API built using express and GraphQL

I built this while learning about GraphQL

## Get Started

Run

```shell
npm install
```

To start the server, run 
```shell
npm run start
```

Navigate to [localhost:2000/graphql](http://localhost:2000/graphql)


You can do mutations and query (More info by reading the auto-generated docs)

A books is attributed :
- A name
- An id
- An authorId

You can 
```js
query {
	books {
		name,
		id,
		author
	}
}
```

or for  a specific book
```js
query {
	book(id: 1) {
		name,
		id,
		author
	}
}
```

An author has : 
- A name
- An id
- By graph, is linked to books created
Therefore you can 
```js
query {
	authors {
		books {
			name
		},
		name
	}
}
```

Or for a specific author

```js
query {
	author(id: 1) {
		name,
		books {
			name,
			id
		}
	}
}
```

For mutations (create operations) : You can create an author or a book

```js
mutation {
	addBook(name: String, authorId: Int) {
		name,
		author
	}
}
```

```js
mutation {
	addAuthor(name: String) {
		name,
		id
	}
}
```

### That's all folks


