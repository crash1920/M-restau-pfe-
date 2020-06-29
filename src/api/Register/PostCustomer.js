import{api_url,api_key} from '../config' ; 


export  async function  PostingCustomer (a,b,c,d,e)
    {  
       

            fetch(api_url+'customers?schema=blank&'+api_key,
            {
                method: 'POST',
                headers: 
                {  'Authorization': 'Basic '+api_key,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                 'customer': {
                 'firstname' :  a,

                 'lastname' : b,

                 'passwd' :c,

                 'email' :d,
                  'active':'1'  ,
                  'id_default_group':'3',
                  'birthday':e
                }
                })
               
            }).then((response) => response.text()).then((responseJsonFromServer) =>
            {
                console.log(responseJsonFromServer);

               

            }).catch((error) =>
            {
                console.error(error);

            });
        }
