const objectToFormData=  (objData : object)=>{
    const data = new FormData();

    for (const key in objData) {
        if (key === 'field') {
          data.append(key, objData[key][1])
        } else {
          data.append(key, objData[key])
        }
    }
    
    return data;
}

export default objectToFormData;