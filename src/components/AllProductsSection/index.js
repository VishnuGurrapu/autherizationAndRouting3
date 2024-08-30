import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }
  componentDidMount(){
    this.getProducts()
  }

  getProducts=async()=>{
    const apiUrl='https://apis.ccbp.in/products'
    
    const token= Cookies.get('jwt_token')
    const options={
      method:'GET',
      headers:{
        Authorization : `Bearer ${token}`
      }
    }
    const response=await fetch(apiUrl,options)
    if(response.ok===true){
      const fetchedData=await response.json()
      const updatedData=fetchedData.products.map(product=>({
        title:product.title,
        brand:product.brand,
        rating:product.rating,
        imageUrl:product.image_url,
        id:product.id,
        price:product.price
      }))
      this.setState({productsList:updatedData, isLoading: false})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }
   renderLoader = () => (
    <div  data-testid="loader" className="loader-container">
      <Loader type="Oval" color="grey" height={50} />
    </div>
  )
  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
