export interface SupabaseAuth {
    email: string,
    password: string,
}

export interface SupabaseSignup extends SupabaseAuth{
    role : "teacher" | "student"
    fullname : string,
    phone : string,
    profileImage ?: File
}

export interface VideoUploadpayload {
    creator_name : string,
    creator_img_url :string,
    creator_id : string,
    file : File
}