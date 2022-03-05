import '../styles/globals.css'
import {ApolloProvider} from '@apollo/client'
import Client from '../config/apollo'
import {Provider} from 'react-redux'; 
import store from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider
    client={Client}
    >
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
     
    </ApolloProvider>
  )
}

export default MyApp
