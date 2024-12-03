import mongoose from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';


// user schema
const userSchema = new mongoose.Schema(
    {   
        firstname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: false,
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: false,
        },
        address: {
            type: String,
            trim: true,
            required: false,
            maxlength: 100,
            sparse: true,
        },
        email : {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true,
            lowercase: true,
            sparse: true
        },
        phone: {
            type: String,
            trim: true,
            maxlength: 10,
            required: false,
            unique: false,
            sparse: true
        },
        orders: {
            type: Array,
            default: []
        },
        reviews: {
            type: Array,
            default: []
        },
        username: {
            type: String,
            trim: true,
            required: false,
            maxlength: 32,
            unique: true,
            lowercase: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        is_Owner: {
            type: Boolean, 
            default: false, 
        },
        
        salt : String,
            
    }, 
    {
        timestamps: true
    }
);

// virtual field
userSchema.virtual('password')
    // create a temporary variable, _password, which is not stored in the database
    .set(function(password) {
        this._password = password;
        // generate a timestamp, uuidv1 gives us a unique id (unix timestamp)
        this.salt = uuidv1();
        // encrypt the password function call
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

    // methods
    userSchema.methods = { 
        // authenticate method
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        },
        // encrypt password method
        encryptPassword: function(password) {
            if (!password) return "";
            try {
                return crypto.createHmac('sha256', this.salt)
                            .update(password)
                            .digest('hex');
            } catch (err) {
                return "";
            }
        }
    };

// export user model
const User = mongoose.model("User", userSchema);
export {User};