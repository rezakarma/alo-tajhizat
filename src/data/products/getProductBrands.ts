const GetProductBrand =async () => {
    const result = await fetch('/api/productBrand');
    console.log(result);
    if(!result.ok){
        return null
    } 
    console.log(result);

    const response = await result.json()
    console.log(response)
    return response
}

export default GetProductBrand