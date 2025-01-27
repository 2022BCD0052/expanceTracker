export const getProfileImage = (file: any) => {
    if (file && typeof file === 'string') {
      return  file ;
    }
    if (file && typeof file === 'object') {
      return file.uri ;
    }

    // return require("../../../Pictures/wallpaper/pexels-daredevil-28288474.jpg")

};