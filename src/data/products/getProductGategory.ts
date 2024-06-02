const GetProductGategory =async () => {
    const result = await fetch('/api/productCategory');
    if(!result.ok){
        return null
    } 
    const response = await result.json()
    return response
}

export default GetProductGategory