import { gql } from '@apollo/client'

const mutations = {
    CREATE_ACCOUNT:  gql`
        mutation newUser($input:UserInput) {
            newUser(input: $input){
            id
            name
            lastName
            created

        }
     }
    `,
    LOGIN: gql`
        mutation AuthUser($input:AuthInput) {
            AuthUser(input: $input) {
                token
            }
        }
    `,
    NEW_CLIENTE: gql`
        mutation newCliente($input: ClienteInput){
            newCliente(input:$input){
                id
                name
                lastName
                email
                phone
                business
                
            }
         }
    `,
    DELETE_CLIENTE: gql`
        mutation deleteCliente($id:ID!){
        deleteCliente(id: $id)
}
    `,

    UPDATE_CLIENTE: gql`
        mutation updateCliente($id:ID!, $input:ClienteInput){
        updateCliente(id:$id, input:$input){
            name
            lastName
            phone
        }
}
    `,
    DELETE_PRODUCT: gql`
        mutation deleteProduct($id:ID!){
    deleteProduct(id:$id)
    }
    `,
    NEW_PRODUCT: gql `
        mutation newProduct($input:productInput){
        newProduct(input:$input) {
            id
            name
            existence
            price
            created
        }
}
    `,
    EDIT_PRODUCT: gql`
        mutation updateProduct($id:ID!, $input:productInput){
        updateProduct(id:$id, input:$input) {
            id
            name
            existence
            price
        }
}
    `,
    NEW_ORDER: gql`
    mutation newOrder($input:orderInput){
        newOrder(input:$input) {
            state
            created
            id
            order {
            id
            cantidad
            }
            seller
            cliente{
                name
            }
        }
}
    `,

    UPDATE_STATE_ORDER: gql`
        mutation updateOrder($id: ID!, $input:orderInput){
        updateOrder(id: $id, input:$input) {
            state
        }
}
    `,

    DELETE_ORDER: gql`
        mutation deleteOrder($id:ID!){
        deleteOrder(id:$id)
        }
    `
}

export default mutations