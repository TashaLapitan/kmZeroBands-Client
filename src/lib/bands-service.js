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

  createBand = (title, description, phoneNumber, contactInfo, instagramUrl, youtubeUrl, genre1, genre2, genre3, pricePerHour, canCustomizePlaylist, minNoticePeriod) => {
    const genres = [genre1, genre2, genre3];
    const pr = this.api.post('/bands', {title, description, genres, phoneNumber, contactInfo, instagramUrl, youtubeUrl, pricePerHour, canCustomizePlaylist, minNoticePeriod})
    return pr
  }

}

const bandService = new BandService();

export default bandService;