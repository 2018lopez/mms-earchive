//Function to view inquires - authenicate user management account to view inquires
function viewInquires(authUser){

    if(authUser == true){

        return true
    }

    return false
}

 module.exports = viewInquires