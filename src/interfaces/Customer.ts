type GUID = string & { isGuid: true};
function guid(guid: string) : GUID {
    return  guid as GUID; // maybe add validation that the parameter is an actual guid ?
}

export interface Customer
{
    customer_id ?: Number,
    customer_name: string,
    customer_dob: Date,
    notification_subscribed: Boolean,
    registered_mode : Number,
    phone : Number,
    status : boolean,
    token : GUID,
    email : string,
    registered_date : Date,
    last_updated: Date
}