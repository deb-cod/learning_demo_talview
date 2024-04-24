export class Query {
    query_data_by_id(id){
            return `
      query {
        mock_data_by_pk(id:${id}) {
          id
          first_name
          last_name
          cars {
            car_make
            car_model
          }
        }
      }`
    };

    mutation_car_vin_by_id(id, new_vin) {
        return `mutation {
            update_car_by_pk(pk_columns: {id: ${id}}, _set: {car_vin: "${new_vin}"}) {
                car_vin
            }
        }`

        // return
    }

}
