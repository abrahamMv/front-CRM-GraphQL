import { gql } from '@apollo/client'


const query = {
    GET_CLIENTES_SELLER: gql`
        query getClientesbySeller{
            getClientesbySeller {
                id
                name
                lastName
                business
                email
            }
      }
    `,
    GET_USER: gql`
        query getUser{
            getUser{
                id
                name
                lastName
            }
         }
          ` ,

    GET_CLIENTE: gql`
    query getCliente($id:ID!){
            getCliente(id:$id){
                id
                name
                lastName
                business
                email
                phone
                
            }
}
    `,

    GET_PRODUCTS: gql`
    query getProducts {
        getProducts {
            id
            name
            existence
            price
        }
}
    `,
    GET_PRODUCT: gql`
        query getProduct($id:ID!){
            getProduct(id: $id) {
                id
                name
                existence
                price
            }
}
    `,

    GET_ORDERS :gql`
          query getOrdersBySeller{
            getOrderBySeller {
                id
                order {
                    id
                    cantidad
                    name
                    price
                }
                cliente{
                    id
                    name
                    lastName
                    email
                    phone
                }
                seller
                state
                total
            }
}
    `,
    BEST_SELLERS: gql`
        query bestSeller{
        bestSeller {
            seller {
            name
            email
            lastName
            }
            total
        }
}
    `,

    BEST_CLIENTES: gql`
    query bestCliente{
    bestCliente {
        cliente {
        business
        name
        }
        total
    }
    }
        `
    }

    export default query

