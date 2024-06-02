const GetProduct =async (id) => {
    const result = await fetch(`/api/products/${id}`)
    if(!result.ok) {
        return {error: 'در گرفتن محصول خطایی رخ داده است'}
    } 
    const response = await result.json();
    console.log(response)
    return response
}
 
export default GetProduct;
