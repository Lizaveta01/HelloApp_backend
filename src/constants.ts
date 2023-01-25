export const port = 4000;
export const saltForHash = 9;
export const secret = 'SECRET_KEY';

export enum ServerResponse {
    USER_NOT_FOUND = 'User not found',
    USER_BLOCKED = 'User blocked',
    USER_DELETED = 'Successfully deleted user',
    USER_UPDATED = 'Successfully updated user',
    USER_EXIST = 'User already existsr',
    PASSWORD_WRONG = 'Password wrong',
    SERVER_ERROR = 'Server error. Something went wrong',
    AUTH_ERROR = 'Authorization error',
    
}
