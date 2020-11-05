const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const app = express()
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} = require("graphql")

const authors = [
	{id:1, name: "Mike"},
	{id:2, name: "Jason"},
	{id:1, name: "Douglas"}
]

const books = [
	{ id: 1, name: "Harry Potter", authorId: 1},
	{ id: 2, name: "Harmony", authorId: 1},
	{ id: 3, name: "The Pelican", authorId: 1},
	{ id: 4, name: "Renoe Farmer", authorId: 2},
	{ id: 5, name: "Dumb World", authorId: 2},
	{ id: 6, name: "Sisters", authorId: 2},
	{ id: 7, name: "Jack and the Flying car", authorId: 3},
	{ id: 8, name: "Entrapreneur", authorId: 3}
]

const BookType = new GraphQLObjectType({
	name: 'Books',
	description: "Just some books",
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		authorId: {type: new GraphQLNonNull(GraphQLInt)},
		author: {
			type: AuthorType,
			resolve: (book) => {
				return authors.find(author => author.id === book.authorId)
			}
		}			
		})
})


const AuthorType = new GraphQLObjectType({
	name: 'Author',
	description: "Author of book",
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		books: {
			type: new GraphQLList(BookType),
			resolve: (author) => {
				return books.filter(book => book.authorId === author.id)
			}
		}			
		})
})



const RootQueryType = new GraphQLObjectType({
	name: "Query",
	description: "Root Query",
	fields: () => ({
	book: {
		type: BookType,
		description: "A book",
		args: {
			id: { type: GraphQLInt}
		},
		resolve: (parent, args) => books.find(book => book.id === args.id)
	},
	author: {
				type: AuthorType,
				description: "An Author",
				args: {
					id: {type: GraphQLInt}
				},
				resolve: (parent, args) => authors.find(author => author.id === args.id)
					},
		books: {
			type: new GraphQLList(BookType),
			description: "The books",
			resolve: () => books
		},
		authors: {
							type: new GraphQLList(AuthorType),
							description: "The authors",
							resolve: () => authors
						},
						
	})
})

const RootMutation = new GraphQLObjectType({
	name: "Mutation",
	description: "Root Mutation",
	fields: () => ({
		addBook: {
			type: BookType,
			description: "Add a book",
			args: {
				name: { type: GraphQLNonNull(GraphQLString)},
				authorId: { type: GraphQLNonNull(GraphQLInt)},
			},
			resolve: (parent, args) => {
				const book = {id: books.length+1, name: args.name, authorId: args.authorId}
				books.push(book)
				return book
			}
		},
		addAuthor: {
					type: AuthorType,
					description: "Add an author",
					args: {
						name: { type: GraphQLNonNull(GraphQLString)}
					},
					resolve: (parent, args) => {
						const author = {id: authors.length+1, name: args.name}
						authors.push(author)
						return author
					}
				}
	})
})

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutation
})


app.use("/graphql", graphqlHTTP({
	graphiql: true,
	schema: schema
}))


app.listen(2000, () => console.log("Running : 5000"))
