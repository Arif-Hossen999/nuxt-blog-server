
const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
class AuthorizationService {
    
    // Authorization for user update and delete hostel
    verifyPermission(resource, postUserId){
        if(resource != postUserId){
            throw new InvalidAccessException();
        }
    }
    
}

module.exports = new AuthorizationService();