import {ApolloClient,InMemoryCache, createHttpLink} from "@apollo/client"
import {setContext} from 'apollo-link-context'
import credentials from "../services/credentials"

const httpLink = createHttpLink({
    uri:'https://cgraphqlrm.herokuapp.com/'
})

const authLink = setContext((_,{headers})=>{
    return{
        headers:{
            ...headers,
            authorization: credentials.getToken() ? credentials.getToken() : ''
        }
    }
})

const Cliente = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default Cliente