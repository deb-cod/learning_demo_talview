export class Query {
    query_data_by_id(id){
      // car at line 10 must b changed to cars for local
            return `
      query {
        user_data_by_pk(id:${id}) {
          id
          first_name
          last_name
          car {
            car_make
            car_model
            car_model_year
          }
        }
      }`
    };

  //   query_data_by_id(id){
  //   return `subscription GetMockDataStreamingSubscription {
  //     mock_data_stream(batch_size: 10, cursor: {initial_value: {id: ${id}}}) {
  //       email
  //       first_name
  //       gender
  //       last_name
  //       id
  //     }
  //   }`
  // };
        



  // CLOUD
  mutation_car_vin_by_id(id, new_vin) {
    return `mutation {
        update_car_by_pk(pk_columns: {user_id: ${id}}, _set: {car_vin: "${new_vin}"}) {
            car_vin
        }
    }`

    // LOCAL
    // mutation_car_vin_by_id(id, new_vin) {
    //     return `mutation {
    //         update_car_by_pk(pk_columns: {id: ${id}}, _set: {car_vin: "${new_vin}"}) {
    //             car_vin
    //         }
    //     }`

        // return
    }

}





// // Define the GraphQL mutation
// const mutation = `
//   mutation UpdateBookTitle($bookId: Int!, $newTitle: String!) {
//     update_books_by_pk(pk_columns: { id: $bookId }, _set: { title: $newTitle }) {
//       id
//       title
//       author
//     }
//   }
// `;
//
// // Express route to update a book's title
// app.post('/update-book-title', async (req, res) => {
//     const bookIdToUpdate = 1; // Replace with the actual book ID
//     const newTitle = 'New Book Title'; // Replace with the desired new title
//
//     try {
//         const data = await client.request(mutation, { bookId: bookIdToUpdate, newTitle });
//         res.json(data.update_books_by_pk);
//     } catch (error) {
//         console.error('Error updating book title:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



