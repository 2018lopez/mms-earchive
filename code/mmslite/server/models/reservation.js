const db = require('../config/db')

const reservation ={

    get:{

        async detailsById(username){
            let query = 'CALL getReservationDetails(?)';                        
            return await db(query, [username], async (data) => data[0]);
        },
       
        async endStatusById(username){
            let query = 'select r.end from reservation r inner join user u on r.user_id = u.id where u.username  = ?'
            return await db(query, [username], async  data=>data[0]);
        }

    },

    put:{
       
        async updateEnd($reservation){

            let query = 'call sp_updateREnd(?,?)'
            await db(query,[$reservation.username,$reservation.endDate ], data=>data[0])
        },
        async updateDetails($reservation){

            let query = 'UPDATE `reservation` SET `business_name` = ?,\
                         `business_tel` = ?, `business_email` =?, `facebook` = ?, \
                         `instagram` =?, `about_us` =?\
                         WHERE id = ?;'
            await db(query,[$reservation.bName, $reservation.bTel, $reservation.email, 
                            $reservation.fb, $reservation.ig, $reservation.des, $reservation.id], 
                            data=>data
                    )
        }
    }

}

module.exports = reservation