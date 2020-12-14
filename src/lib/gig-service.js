import axios from "axios";

class GigService {
    constructor() {
      
      this.api = axios.create({        
        baseURL: `${process.env.REACT_APP_API_URL}/api`,
        withCredentials: true
      });
    }
  
    getAllGigs = () => {
      const pr = this.api.get('/gigs')
      return pr
    }

    searchGigs = (city) => {
        const pr = this.api.get(`/gigs/search/${city}`)
        return pr
    }
  
    getGigByID = (id) => {
        const pr = this.api.get(`/bands/${id}`)
        return pr
    }
  
    createGig = (title, description, date, city, genre, durationHours, pricePerHour) => {
      const pr = this.api.post('/gigs', {title, description, date, city, genre, durationHours, pricePerHour})
      return pr
    }
  
    updateGig = (_id, title, description, city, date, genre, durationHours, pricePerHour) => {
      const pr = this.api.put(`/gigs/${_id}`, {title, description, city, date, genre, durationHours, pricePerHour})
      return pr;
    }
  
    deleteGig = (id) => {
      const pr = this.api.delete(`/gigs/${id}` )
      return pr;
    }
  
  }
  
  const gigService = new GigService();
  
  export default gigService;