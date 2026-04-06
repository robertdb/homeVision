import type { House } from '@/types/house'
import { HouseCard } from '../HouseCard'

const MockData: House[] = [
  {
    "id": 10,
    "address": "62 Eagle Dr. Chesapeake, VA 23320",
    "homeowner": "Wojciech Sanders",
    "price": 85372,
    "photoURL": "https://images.adsttc.com/media/images/5e5e/da62/6ee6/7e7b/b200/00e2/medium_jpg/_fi.jpg"
  },
  {
    "id": 11,
    "address": "878 1st St. Lombard, IL 60148",
    "homeowner": "Chelsey Cottrell",
    "price": 258768,
    "photoURL": "https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg"
  },
  {
    "id": 12,
    "address": "73 St Paul Rd. Statesville, NC 28625",
    "homeowner": "Ethan Hernandez",
    "price": 274254,
    "photoURL": "https://media-cdn.tripadvisor.com/media/photo-s/09/7c/a2/1f/patagonia-hostel.jpg"
  },
  {
    "id": 13,
    "address": "9565 Glen Ridge Ave. Manassas, VA 20109",
    "homeowner": "Benito Lake",
    "price": 80713,
    "photoURL": "https://images.adsttc.com/media/images/5e5e/da62/6ee6/7e7b/b200/00e2/medium_jpg/_fi.jpg"
  },
  {
    "id": 14,
    "address": "218 Jackson St. Whitestone, NY 11357",
    "homeowner": "Zidan Hester",
    "price": 248008,
    "photoURL": "https://image.shutterstock.com/image-photo/traditional-english-semidetached-house-260nw-231369511.jpg"
  },
  {
    "id": 15,
    "address": "351 West Mountainview Lane Rowlett, TX 75088",
    "homeowner": "Ellis Burn",
    "price": 217776,
    "photoURL": "https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg"
  },
  {
    "id": 16,
    "address": "88 Blue Spring Ave. East Lansing, MI 48823",
    "homeowner": "Anja Johnston",
    "price": 266644,
    "photoURL": "https://image.shutterstock.com/image-photo/houses-built-circa-1960-on-260nw-177959672.jpg"
  },
  {
    "id": 17,
    "address": "8929 Grove Drive Ellenwood, GA 30294",
    "homeowner": "Reuben Holder",
    "price": 217689,
    "photoURL": "https://i.pinimg.com/originals/47/b9/7e/47b97e62ef6f28ea4ae2861e01def86c.jpg"
  },
  {
    "id": 18,
    "address": "347 Tarkiln Hill Dr. Miami, FL 33125",
    "homeowner": "Leja Ellwood",
    "price": 228245,
    "photoURL": "https://i.pinimg.com/originals/47/b9/7e/47b97e62ef6f28ea4ae2861e01def86c.jpg"
  },
  {
    "id": 19,
    "address": "9 Cardinal Court Saint Cloud, MN 56301",
    "homeowner": "Una Herman",
    "price": 176337,
    "photoURL": "https://image.shutterstock.com/image-photo/houses-built-circa-1960-on-260nw-177959672.jpg"
  }
]

export const HouseFeed = () => {

  return(
   <div
    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    role="list"
    >
    {MockData.map((house) => (
      <div key={house.id} role="listitem">
        <HouseCard house={house} />
      </div>
    ))}
  </div>
  )
} 


