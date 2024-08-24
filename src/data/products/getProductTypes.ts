const GetProductTypes =async () => {
    const result = await fetch('/api/productType');
    console.log(result);
    if(!result.ok){
        return null
    } 
    console.log(result);

    const response = await result.json()
    console.log(response)
    return response
}

export default GetProductTypes