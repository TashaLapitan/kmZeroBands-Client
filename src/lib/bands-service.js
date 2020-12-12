import axios from "axios";


class BandService {
  constructor() {
    
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });
  }

  getAllBands = () => {
    const pr = this.api.get('/bands')
    return pr
  }

  getBandByID = (id) => {
      const pr = this.api.get(`/bands/${id}`)
      return pr
  }

  createBand = (title, description, image, city, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod) => {
    const genres = [genre1, genre2, genre3];
    const pr = this.api.post('/bands', {title, description, image, city, genres, phoneNumber, contactInfo, instagramUrl, youtubeUrl, pricePerHour, canCustomizePlaylist, minNoticePeriod})
    return pr
  }

  updateBandInfo = (bandID, title, description, city, image, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod) => {
    const genres = [genre1, genre2, genre3];
    const pr = this.api.put(`/bands/${bandID}`, {title, description, city, image, genres, phoneNumber, contactInfo, instagramUrl, youtubeUrl, pricePerHour, canCustomizePlaylist, minNoticePeriod})
    return pr;
  }

  deleteBand = (id) => {
    const pr = this.api.delete(`/bands/${id}` )
    return pr;
  }

}

const bandService = new BandService();

export default bandService;