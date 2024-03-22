import { createClient } from "@supabase/supabase-js";
import { SupabaseAuth, SupabaseSignup, VideoUploadpayload } from "./supabaseInterface";
// import { Cookie } from "@mui/icons-material";
import { destroyCookie, setCookie } from "nookies";
import { setToken, setUserId } from "@/lib/auth";
// import { decode } from 'base64-arraybuffer'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export const useUserSignup = () => {
  const userSignUp = async (userInput: SupabaseAuth) => {
    const { data: signupData, error: signUpError } = await supabase.auth.signUp(
      {
        email: userInput.email,
        password: userInput.password,
      }
    );
    return {
      signupData,
      signUpError,
    };
  };
  const addImageToStorage = async (id: string, email: string, file: File) => {
    if (file) {
      const { data: imageUploadData, error: imageUploadError } =
        await supabase.storage
          .from("profile")
          .upload(`${email}${Math.random()}${Date()}`, file, {
            contentType: file.type,
          });
      console.log(imageUploadError, "I am error");
      if (!imageUploadError) {
        const { data: imgUrl } = supabase.storage
          .from("profile")
          .getPublicUrl(imageUploadData.path);
        return {
          imageUrl: imgUrl,
          imageUploadError,
        };
      }
    }
    return {
      imageUrl: null,
      imageUploadError: false,
    };
  };

  const addUserToDatabase = async (
    userInput: SupabaseSignup,
    userId: string,
    imgUrl?: string | null
  ) => {
    const { fullname, email, role, phone } = userInput;
    const { data: dataUpload, error: dataUploaderror } = await supabase
      .from("Users")
      .insert([
        {
          role,
          fullname,
          email,
          phone,
          profile_image: imgUrl,
          user_id : userId,
          pending: Boolean(role === "teacher"),
        },
      ]);
    return {
      dataUpload,
      dataUploaderror,
    };
  };

  const userSignup = async (userInput: SupabaseSignup) => {
    const { signupData, signUpError } = await userSignUp({
      email: userInput.email,
      password: userInput.password,
    });

    if (
      !signUpError &&
      signupData.user?.id &&
      signupData.user?.email &&
      userInput.profileImage
    ) {
      const { imageUrl, imageUploadError } = await addImageToStorage(
        Math.random().toString() + Date(),
        signupData.user.email,
        userInput.profileImage
      );

      if (!signUpError && signupData.session?.access_token) {
        supabase.realtime.setAuth(signupData.session.access_token);
      }

      if (!imageUploadError && signupData.session?.user) {
        const {} = await addUserToDatabase(
          userInput,
          signupData.session.user.id,
          imageUrl?.publicUrl
        );
        if (userInput.role !== "teacher") {
          setCookie(null, "token", signupData.session.refresh_token, {
            path: "/",
          });
          setUserId(signupData.session.user.id);
          setToken(signupData.session.refresh_token);
        }
        return {
          success: !Boolean(signUpError),
          role: userInput.role,
          accessToken: signupData.session?.access_token,
          refreshToken: signupData.session?.refresh_token,
          userId: signupData.session?.user.id,
          imgUrl: imageUrl,
        };
      }
    }

    return {
      success: !Boolean(signUpError),
      role: userInput.role,
      accessToken: signupData.session?.access_token,
      refreshToken: signupData.session?.refresh_token,
      userId: signupData.session?.user.id,
      imgUrl: null,
    };
  };

  return { userSignup, addImageToStorage };
};

export const userLogin = async (userInput: SupabaseAuth) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userInput.email,
    password: userInput.password,
  });
  if (!error && typeof data.session?.access_token === "string") {
    console.log(data.session.access_token, "token");
    supabase.realtime.setAuth(data.session.access_token);
    setCookie(null, "token", data.session.refresh_token, {path : "/"});
    setUserId(data.session.user.id);
    setToken(data.session.refresh_token);
    console.log(data);
    const { data: userData, error } = await supabase
      .from("Users")
      .select()
      .eq("user_id", data.session.user.id);
    console.log(data.session.user.id, "id");
    return {
      data: userData,
      error,
    };
  }
  return {
    data: null,
    error,
  };
};

export const userLogout = async () => {
  const { error } = await supabase.auth.signOut();
  setUserId(null);
  setToken(null);
  destroyCookie(null, "token");
  if (error) {
    userLogout();
  }
};

export const InitialChecking = async (token: string | undefined | null) => {
  if (token) {
    // supabase.realtime.setAuth(token);
  }
};

export const videoUpload = async(file : File) => {
  
  const {data : userData, error : userError} = await supabase.from("Users").select()
  if(userData && !userError){
    const {id, role, fullname, profile_image} = userData[0]
    const uploadVideo = async() => {
      const { data: videoUploadData, error: videoUploadError } =  
            await supabase.storage
              .from("videos")
              .upload(`${fullname}${Math.random()}${Date()}`, file, {
                contentType: file.type,
              });
          console.log(videoUploadError, "I am videoerror")
          if (!videoUploadError) {
            const { data: videoUrl } = supabase.storage
              .from("videos")
              .getPublicUrl(videoUploadData.path);
            return {
              videoUrl: videoUrl,
              videoUploadError,
            };
          }
          return {
            videoUrl: null,
            videoUploadError,
          }
      }
  
      const addVideoToDatabase = async (video_url : string) => {
        const { data: dataUpload, error: dataUploaderror } = await supabase
          .from("videos")
          .insert([
            {
              creator_name : fullname,
              creator_id : id,
              creator_img_url : profile_image,
              video_url
            },
          ]);
          console.log(dataUploaderror, "dataupload error");
        return {
          dataUpload,
          dataUploaderror,
        };
      };
      const {
        videoUrl,
        videoUploadError,
      } = await uploadVideo()
    
      if(!videoUploadError){
        await addVideoToDatabase(videoUrl.publicUrl)
      }
  }

}

export const getTeacherVideos = async() => {
  const {data : creator_id, error : verificationError} = await supabase.from("Users").select("id")
  if(!verificationError && creator_id[0]?.id){
    const {data : videosData, error} = await supabase.from("videos").select().eq("creator_id", creator_id[0].id)
    return {
      videosData,
      error
    }
  }
  return{
    videosData : null,
    error : null
  }
}
export const getVideoDetails = async(id : string) => {
  const {
    data,
    error
  } = await supabase.from("videos").select().eq("id", id)
  return {
    data : data && data[0],
    error
  }
}