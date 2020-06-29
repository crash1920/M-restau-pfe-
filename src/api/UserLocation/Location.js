import{api_url,api_key} from '../config' ; 

  export async function adresses(id){
    try {
          const response = await fetch(api_url + 'addresses?display=full&filter[id_customer]=['+id+']&' + api_key);
          return await response.json();
      }
      catch (error) {
          console.error(error);
      }

    }export  async function  NewAddress (fn,ln,add,cp,city,id,alias)
    {  
       

            fetch(api_url+'addresses?schema=blank&'+api_key,
            {
                method: 'POST',
                headers: 
                {  'Authorization': 'Basic '+api_key,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                 'addresses': {
                   'alias':alias,
                  'id_customer':id,
                 'firstname' :  fn,
                  'id_country':"210",
                 'lastname' : ln,
                 'address1' : add,
                 'postcode' : cp , 
                 'city':city,
                }
                })
               
            }).then((response) => response.text()).then((responseJsonFromServer) =>
            {
                alert("ajout avec succés")
                console.log(responseJsonFromServer);

               

            }).catch((error) =>
            {
                console.error(error);

            });
        }
        export  async function  DeleteAddress (id)
        {  
           
    
                fetch(api_url+'addresses/'+id+'?'+api_key,
                {
                    method: 'DELETE',
                    headers: 
                    {  'Authorization': 'Basic '+api_key,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                
                   
                }).then((response) => response.text()).then((responseJsonFromServer) =>
                {
                    console.log(responseJsonFromServer);
    
                   
    
                }).catch((error) =>
                {
                    console.error(error);
    
                });
            }
            export  async function  UpdateAddress (fn,ln,add,cp,city,id,alias,id_add)
    {  
       

            fetch(api_url+'addresses/'+id_add+'?'+api_key,
            {
                method: 'PUT',
                headers: 
                {  'Authorization': 'Basic '+api_key,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                 'addresses': {
                     'id':id_add,
                   'alias':alias,
                  'id_customer':id,
                 'address1' : add,
                 'postcode' : cp , 
                 'city':city,
                 'id_country':"210",
                 'firstname' :  fn,
                 'lastname' : ln,
                }
                })
               
            }).then((response) => response.text()).then((responseJsonFromServer) =>
            {
                alert("mise a jour  avec succés")
                console.log(responseJsonFromServer);

               

            }).catch((error) =>
            {
                console.error(error);

            });
        }
    