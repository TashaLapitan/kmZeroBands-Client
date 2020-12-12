import axios from "axios";

class GigService {
    constructor() {
      
      this.api = axios.create({        
        baseURL: "http://localhost:5000/api",
        withCredentials: true
      });
    }
  
    getAllGigs = () => {
      const pr = this.api.get('/gigs')
      return pr
    }
  
    getGigByID = (id) => {
        const pr = this.api.get(`/bands/${id}`)
        return pr
    }
  
    // req.body title, description, durationHours, date, genres, pricePerHour
    createGig = (title, description, date, genre, durationHours, pricePerHour) => {
      const pr = this.api.post('/gigs', {title, description, date, genre, durationHours, pricePerHour})
      return pr
    }
  
    // updateBandInfo = (bandID, title, description, image, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod) => {
    //   const genres = [genre1, genre2, genre3];
    //   const pr = this.api.put(`/bands/${bandID}`, {title, description, image, genres, phoneNumber, contactInfo, instagramUrl, youtubeUrl, pricePerHour, canCustomizePlaylist, minNoticePeriod})
    //   return pr;
    // }
  
    // deleteBand = (id) => {
    //   const pr = this.api.delete(`/bands/${id}` )
    //   return pr;
    // }
  
  }
  
  const gigService = new GigService();
  
  export default gigService;