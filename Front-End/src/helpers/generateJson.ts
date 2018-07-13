export const generateJson = ( form,json) => {
    Object.keys(form.value).map((key)=>{
        console.log("key to store: "+key);
        json[key]= form.value[key];
        return json;
      });
}